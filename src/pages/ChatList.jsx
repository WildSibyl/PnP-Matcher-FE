import { useEffect, useState } from "react";
import ChatModal from "../components/chat-comp/ChatModal";
import { useWebSocketContext } from "../context/WSContextProvider";
import { getUserById } from "../data/user";
import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";

const ChatList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [otherUsers, setOtherUsers] = useState({});
  const {
    messages,
    setMessages,
    fetched,
    loading: authLoading,
  } = useWebSocketContext();
  const { user } = useAuth();

  //get the user id from the auth context
  const currentUserId = user._id;

  console.log("Current user ID:", currentUserId);
  //get the other user id from the chatId
  const getOtherUserId = (chatId, currentUserId) => {
    return chatId.split("-").find((id) => id !== currentUserId);
  };

  const loading = authLoading || !fetched || !user;

  const { recentChatIds, lastMessagesByChat } = useMemo(() => {
    if (!fetched || messages.length === 0)
      return { recentChatIds: [], lastMessagesByChat: {} };

    const lastMessages = {};
    const chatIds = [];

    messages.forEach((msg) => {
      const chatId = msg.chatId;
      if (msg.sender === currentUserId || msg.recipient === currentUserId) {
        chatIds.push(chatId);
        lastMessages[chatId] = msg;
      }
    });

    return {
      lastMessagesByChat: lastMessages,
      recentChatIds: [...new Set(chatIds)],
    };
  }, [fetched, messages, currentUserId]);

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
        console.log("Fetched user IDs:", usersToFetch);

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

  if (loading) {
    return <p className="text-pnp-white">Loading chats…</p>;
  }

  if (!user) {
    return <p className="text-pnp-white">User data is incomplete.</p>;
  }
  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {recentChatIds.map((chatId) => {
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
      })}

      <ChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chatId={selectedChatId}
        receiverId={
          selectedChatId ? getOtherUserId(selectedChatId, currentUserId) : null
        }
        username={
          selectedChatId
            ? otherUsers[getOtherUserId(selectedChatId, currentUserId)]
                ?.username
            : ""
        }
      />
    </div>
  );
};

export default ChatList;
