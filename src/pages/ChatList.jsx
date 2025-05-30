import { useEffect, useState } from "react";
import ChatModal from "../components/chat-comp/ChatModal";
import { useWebSocketContext } from "../context/WSContextProvider";
import { useAuth } from "../hooks/useAuth";
import { getUserById } from "../data/user";
import { getChatMessages } from "../data/chat";

const ChatList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [otherUsers, setOtherUsers] = useState({});
  const { messages, setMessages } = useWebSocketContext();
  const { user } = useAuth();
  const lastMessagesByChat = {};

  //get the user id from the auth context
  const currentUserId = user._id;
  //get the other user id from the chatId
  const getOtherUserId = (chatId, currentUserId) => {
    return chatId.split("-").find((id) => id !== currentUserId);
  };

  messages.forEach((msg) => {
    lastMessagesByChat[msg.chatId] = msg; // will be last because messages sorted or iterated in order
  });

  const recentChatIds = [
    ...new Set(
      messages
        .filter(
          (m) => m.sender === currentUserId || m.recipient === currentUserId
        )
        .map((m) => m.chatId)
    ),
  ];

  useEffect(() => {
    const fetchOtherUsers = async () => {
      const usersToFetch = recentChatIds
        .map((chatId) => getOtherUserId(chatId, currentUserId))
        .filter((id) => id && !Object.keys(otherUsers).includes(id));

      if (usersToFetch.length === 0) return;

      try {
        const results = await Promise.all(
          usersToFetch.map((id) =>
            getUserById(id).then((user) => ({
              id,
              username: user.userName,
              avatar: user.avatarUrl,
            }))
          )
        );

        const newUsers = {};
        results.forEach(({ id, username, avatar }) => {
          newUsers[id] = { username, avatar };
        });
        console.log("Fetched users:", newUsers);

        setOtherUsers((prev) => ({ ...prev, ...newUsers }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOtherUsers();
  }, [recentChatIds, currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getChatMessages();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, []);

  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {recentChatIds.length === 0 ? (
        <p className="text-pnp-white">no chats yet.</p>
      ) : (
        recentChatIds.map((chatId) => {
          const otherUserId = getOtherUserId(chatId, currentUserId);
          const user = otherUsers[otherUserId];
          const userName = user?.username || "Loading...";
          const avatarUrl = user?.avatar || "/default-avatar.png";
          const lastMsg = lastMessagesByChat[chatId]?.text || "";

          return (
            <button
              key={chatId}
              className="btn-primary-light hover:text-pnp-purple font-semibold cursor-pointer p-8 w-full flex items-center justify-start"
              onClick={() => openChat(chatId)}
            >
              <img
                src={avatarUrl}
                alt="avatar"
                className="h-[40px] w-[40px] rounded-full"
              />
              <div className="flex flex-col items-start ml-4">
                {userName}{" "}
                <div className="text-xs text-pnp-black mt-1">
                  {lastMsg.length > 30 ? lastMsg.slice(0, 30) + "…" : lastMsg}
                </div>
              </div>
            </button>
          );
        })
      )}

      <ChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chatId={selectedChatId}
      />
    </div>
  );
};

export default ChatList;
