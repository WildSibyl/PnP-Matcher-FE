import { Dialog } from "@headlessui/react";
import { useWebSocketContext } from "../../context/WSContextProvider";
import { useState, useEffect, useRef } from "react";
import { sendChat } from "../../data/chat";
import { useAuth } from "../../hooks/useAuth";
import send_icon from "../../assets/send_icon.png";
import RenChat from "../../assets/ren/Ren-chat.png"; // Assuming this is the image you want to use

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
    const timeout = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      }
    }, 50); // small delay to ensure DOM is ready

    return () => clearTimeout(timeout);
  }, [isOpen, chatMessages]);

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50 lg:flex lg:items-end lg:justify-end"
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-end w-full h-full">
        <div className="w-[0px] lg:w-[50%]"></div>
        <div
          className="fixed inset-0 bg-pnp-black/70 lg:bg-transparent lg:justify-end lg:items-end"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4 lg:justify-end">
          <Dialog.Panel className="bg-pnp-white w-full h-[70vh] rounded-2xl shadow-lg p-6 relative flex flex-col lg:w-[50%] lg:h-[62vh] lg:-translate-y-[14.5%] xl:w-[50%] xl:mr-11 2xl:w-[50%] 2xl:mr-15">
            <button
              onClick={onClose}
              className="absolute top-5 right-6 text-gray-600 hover:text-pnp-black text-xl"
            >
              ✕
            </button>
            <Dialog.Title className="flex flex-col text-lg font-bold mb-3">
              {username}
            </Dialog.Title>

            <div className="flex flex-col flex-grow space-y-4 border border-pnp-purple rounded-lg p-4 mb-4 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-gray-500 italic select-none h-full">
                  <p>Start a conversation with {username}!</p>
                  <img
                    src={RenChat}
                    alt="Ren with a quill"
                    className="h-[200px] mb-4"
                  />
                  <p className="mb-4">And remember:</p>
                  <ul className="list-none space-y-2 mb-4 font-semibold">
                    {[
                      "Be polite and respectful",
                      "Follow the community guidelines",
                      "Keep it friendly and fun",
                    ].map((text, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="w-4 h-4 text-pnp-darkpurple mr-2 flex-shrink-0"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon
                            points="6,0 12,6 6,12 0,6"
                            fill="currentColor"
                          />
                        </svg>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                chatMessages.map((msg, i) => {
                  const isSender = msg.sender === senderId;
                  return (
                    <div
                      key={i}
                      className={`flex m-0 mt-2 ${
                        isSender ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-3 py-2 rounded-lg shadow-md max-w-[70%] break-words ${
                          isSender
                            ? "bg-pnp-darkpurple text-pnp-white"
                            : "bg-pnp-darkblue text-pnp-white"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              )}
              {/* 👇 This dummy element triggers the scroll */}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2"
            >
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
      </div>
    </Dialog>
  );
};

export default ChatModal;
