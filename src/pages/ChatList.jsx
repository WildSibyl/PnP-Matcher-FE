import { useEffect, useState, useMemo } from "react";
import ChatModal from "../components/chat-comp/ChatModal";
import { useWebSocketContext } from "../context/WSContextProvider";
import { getUserById } from "../data/user";
import { useAuth } from "../hooks/useAuth";

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

  // Fetch other users (same)
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

        setOtherUsers((prev) => ({ ...prev, ...newUsers }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOtherUsers();
  }, [recentChatIds, currentUserId]);

  if (loading) return <p className="text-pnp-white">Loading chats…</p>;
  if (!user) return <p className="text-pnp-white">User data is incomplete.</p>;

  const openChat = (chatId) => {
    setActiveChatId(chatId);
    setSelectedChatId(chatId);
    setIsModalOpen(true);
    setIsChatModalOpen(true); // shared modal state
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full lg:max-w-[600px]">
      {recentChatIds.map((chatId) => {
        const otherUserId = getOtherUserId(chatId, currentUserId);
        const user = otherUsers[otherUserId];
        const userName = user?.username || "Loading...";
        const avatarUrl = user?.avatar || "/default-avatar.png";
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
            <div className="flex flex-col items-start ml-4 flex-grow">
              {userName}
              <div className="text-xs text-pnp-black mt-1 truncate max-w-[70vw]">
                {lastMsg.length > 30 ? lastMsg.slice(0, 30) + "…" : lastMsg}
              </div>
            </div>

            {/* Notification dot / badge */}
            {unreadCount > 0 && (
              <div
                className="absolute top-3 right-3 bg-pnp-darkpurple text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold select-none"
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
