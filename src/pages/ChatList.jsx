import { useEffect, useState } from "react";
import ChatModal from "../components/chat-comp/ChatModal";
import { useWebSocketContext } from "../context/WSContextProvider";

const ChatList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { messages } = useWebSocketContext();

  // Derive recent chats from messages (simplified, unique chatIds)
  const recentChatIds = [...new Set(messages.map((m) => m.chatId))];

  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {recentChatIds.length === 0 ? (
        <button
          className="btn-primary-light underline hover:text-pnp-purple font-semibold cursor-pointer"
          onClick={() => openChat("chat-user123-user456")} // example chatId
        >
          Contact
        </button>
      ) : (
        recentChatIds.map((chatId) => (
          <button
            key={chatId}
            className="btn-primary-light underline hover:text-pnp-purple font-semibold cursor-pointer"
            onClick={() => openChat(chatId)}
          >
            Chat: {chatId}
          </button>
        ))
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
