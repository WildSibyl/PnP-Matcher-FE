import { useState } from "react";
import ChatModal from "../components/chat-comp/ChatModal";

const ChatList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold lg:text-[16rem] text-transparent bg-gradient-to-r from-[#6054e8] to-[#f8485e] bg-clip-text">
          CHAT
        </h1>
        <p className="text-2xl font-bold text-gray-700">LIST OF YOUR GROUPS</p>
      </div> */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          type="button"
          className="btn-primary-light underline hover:text-pnp-purple font-semibold cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Chat modal
        </button>
        <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default ChatList;
