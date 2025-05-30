import { Dialog } from "@headlessui/react";
import { useWebSocketContext } from "../../context/WSContextProvider";
import { useState } from "react";

const ChatModal = ({ isOpen, onClose, chatId }) => {
  const { messages, sendMessage } = useWebSocketContext();
  const [input, setInput] = useState("");

  if (!chatId) return null; // No chat selected

  const chatMessages = messages.filter((m) => m.chatId === chatId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({
      type: "message",
      chatId,
      text: input,
      timestamp: Date.now(),
      from: "currentUserId", // Replace with actual current user ID
      to: "otherUserId", // Replace with actual recipient
    });

    setInput("");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-full max-w-md max-h-[70vh] rounded-2xl shadow-lg overflow-y-auto p-6 relative flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>
          <Dialog.Title className="flex flex-col text-lg font-bold mb-4">
            Chat: {chatId}
          </Dialog.Title>

          <div className="flex-grow overflow-y-auto mb-4 space-y-2">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  msg.from === "currentUserId"
                    ? "bg-pnp-purple text-white self-end"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-pnp-white p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pnp-purple"
              placeholder="write here"
            />
            <button
              type="submit"
              className="btn-primary-light flex items-center justify-center p-2 rounded-lg hover:bg-pnp-purple hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.27 3.12A59.77 59.77 0 0 1 21.49 12 59.77 59.77 0 0 1 3.27 20.88L6 12Z"
                />
              </svg>
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ChatModal;
