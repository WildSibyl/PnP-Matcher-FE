import { Dialog } from "@headlessui/react";
import { useWebSocketContext } from "../../context/WSContextProvider";
import { useState, useEffect, useRef } from "react";
import { sendChat } from "../../data/chat";
import { useAuth } from "../../hooks/useAuth";
import send_icon from "../../assets/send_icon.png";

const ChatModal = ({ isOpen, onClose, receiverId, username }) => {
  const { messages, sendMessage } = useWebSocketContext();
  const [input, setInput] = useState("");
  const { user } = useAuth();

  const senderId = user._id;
  const chatId = [senderId, receiverId].sort().join("-");
  const chatMessages = messages.filter((m) => m.chatId === chatId);
  const messagesEndRef = useRef(null);

  useAuth();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  if (!senderId || !receiverId) return null; // Ensure both IDs are available

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageObj = {
      chatId: chatId,
      sender: senderId,
      recipient: receiverId,
      text: input,
    };

    try {
      // Save message to backend DB
      await sendChat(messageObj);

      // Then send through WebSocket for real-time update
      sendMessage({
        type: "message",
        ...messageObj,
      });

      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error.message);
      // Optionally show a UI error here
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-pnp-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-full max-w-md max-h-[70vh] rounded-2xl shadow-lg p-6 relative flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>
          <Dialog.Title className="flex flex-col text-lg font-bold mb-3">
            {username}
          </Dialog.Title>

          <div className="flex flex-col flex-grow space-y-4 border border-pnp-purple rounded-lg p-4 mb-4 overflow-y-auto">
            {chatMessages.map((msg, i) => {
              const isSender = msg.sender === senderId;
              return (
                <div
                  key={i}
                  className={`flex m-0 mt-2 ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg shadow-md max-w-[70%] ${
                      isSender
                        ? "bg-pnp-darkpurple text-pnp-white"
                        : "bg-pnp-darkblue text-pnp-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            {/* 👇 This dummy element triggers the scroll */}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="p-2 w-full rounded-lg border border-pnp-purple focus:outline-none focus:ring-2 focus:ring-pnp-purple"
              placeholder="Write something nice!"
            />
            <button
              type="submit"
              className="btn-primary-light flex items-center justify-center h-[44px] w-[50px] p-0 rounded-lg hover:bg-pnp-purple transition-colors"
            >
              <img src={send_icon} alt="send icon" />
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ChatModal;
