import { useEffect, useState, useMemo } from "react";
import ChatModal from "../components/chat-comp/ChatModal";
import { useWebSocketContext } from "../context/WSContextProvider";
import { getUserById } from "../data/user";
import { useAuth } from "../hooks/useAuth";
import RenChat from "../assets/ren/Ren-chat.png";

const ChatList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [otherUsers, setOtherUsers] = useState({});

  const {
    messages,
    fetched,
    notifications, // <-- get notifications object here
    setActiveChatId,
    setIsChatModalOpen,
  } = useWebSocketContext();

  const { user, loading: authLoading } = useAuth();

  const currentUserId = user?._id;

  // Helper to get other user id from chatId like before
  const getOtherUserId = (chatId, currentUserId) =>
    chatId.split("-").find((id) => id !== currentUserId);

  const loading = authLoading || !fetched || !user;

  // Compute recent chats and last messages per chat (same as before)
  const { recentChatIds, lastMessagesByChat } = useMemo(() => {
    if (!fetched || messages.length === 0)
      return { recentChatIds: [], lastMessagesByChat: {} };

    const lastMessages = {};
    const chatIds = [];

    messages.forEach((msg) => {
      const chatId = msg.chatId;
      if (msg.chatId.includes(currentUserId)) {
        chatIds.push(chatId);
        lastMessages[chatId] = msg;
      }
    });

    return {
      lastMessagesByChat: lastMessages,
      recentChatIds: [...new Set(chatIds)],
    };
  }, [fetched, messages, currentUserId]);

  // Fetch other users (same)
  useEffect(() => {
    const fetchOtherUsers = async () => {
      const usersToFetch = recentChatIds
        .map((chatId) => getOtherUserId(chatId, currentUserId))
        .filter((id) => id && !Object.keys(otherUsers).includes(id));

      if (usersToFetch.length === 0) return;

      try {
        const results = await Promise.all(
          usersToFetch.map(async (id) => {
            try {
              const user = await getUserById(id);
              return {
                id,
                username: user.userName,
                avatar: user.avatarUrl,
              };
            } catch (error) {
              //console.log(`User with ID ${id} not found or deleted.`);
              return {
                id,
                username: "Deleted User",
                avatar: "https://i.imgur.com/VkN1IwQ.jpeg",
              };
            }
          })
        );

        const newUsers = {};
        results.forEach(({ id, username, avatar }) => {
          newUsers[id] = { username, avatar };
        });

        setOtherUsers((prev) => ({ ...prev, ...newUsers }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOtherUsers();
  }, [recentChatIds, currentUserId]);

  if (loading) return <p className="text-pnp-white">Loading chats…</p>;
  if (!user) return <p className="text-pnp-white">User data is incomplete.</p>;

  if (recentChatIds.length === 0) {
    return (
      <div className="flex flex-col self-center items-center justify-center space-y-4 w-full h-[50vh]">
        <div className="flex flex-col self-center items-center justify-center space-y-4 w-full p-5">
          <p className="text-pnp-white">No magical correspondance yet...</p>
          <img
            src={RenChat}
            alt="Ren Chat"
            className="w-[200px] h-[200px] object-contain"
          />

          <p className="text-pnp-white">Start a conversation with someone!</p>

          <p className="text-pnp-white text-center italic">
            ✨ Hint: you can find players and groups in the search page! ✨
          </p>
        </div>
      </div>
    );
  }

  const openChat = (chatId) => {
    setActiveChatId(chatId);
    setSelectedChatId(chatId);
    setIsModalOpen(true);
    setIsChatModalOpen(true); // shared modal state
  };

  return (
    <div className="flex flex-col items-start justify-center space-y-4 w-full">
      <div className="flex flex-col items-center justify-center space-y-4 w-full lg:w-[47%] lg:justify-end mt-4 lg:ml-4 xl:w-[40%] xl:ml-15 2xl:ml-20">
        {[...recentChatIds].reverse().map((chatId) => {
          const otherUserId = getOtherUserId(chatId, currentUserId);
          const user = otherUsers[otherUserId];
          const userName = user?.username || "Loading...";
          const avatarUrl =
            user?.avatar || "https://i.ibb.co/F4MD88Lt/Ren-avatar.png";
          const lastMsg = lastMessagesByChat[chatId]?.text || "";

          // Check if this chat has unread notifications
          const unreadCount = notifications[chatId] || 0;

          return (
            <button
              key={chatId}
              className="btn-primary-light hover:text-pnp-purple font-semibold cursor-pointer p-8 w-full flex items-center justify-start relative"
              onClick={() => openChat(chatId)}
            >
              <img
                src={avatarUrl}
                alt="avatar"
                className="h-[40px] w-[40px] rounded-full"
              />
              <div
                className={`flex flex-col items-start ml-4 flex-grow ${
                  userName === "Deleted User" ? "text-gray-400" : ""
                }`}
              >
                {userName}
                <div className="text-xs text-pnp-black mt-1 truncate max-w-[70vw]">
                  {lastMsg.length > 30 ? lastMsg.slice(0, 30) + "…" : lastMsg}
                </div>
              </div>

              {/* Notification dot / badge */}
              {unreadCount > 0 && (
                <div
                  className="absolute top-3 right-3 bg-pnp-darkpurple text-pnp-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold select-none"
                  title={`${unreadCount} unread message${
                    unreadCount > 1 ? "s" : ""
                  }`}
                >
                  {unreadCount}
                </div>
              )}
            </button>
          );
        })}

        <ChatModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsChatModalOpen(false);
            setActiveChatId(null);
          }}
          chatId={selectedChatId}
          receiverId={
            selectedChatId
              ? getOtherUserId(selectedChatId, currentUserId)
              : null
          }
          username={
            selectedChatId
              ? otherUsers[getOtherUserId(selectedChatId, currentUserId)]
                  ?.username
              : ""
          }
        />
      </div>
      <div className="w-[0px] lg:w-[50%]"></div>
    </div>
  );
};

export default ChatList;
