import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../data/user"; // adjust path
import profilePic from "../assets/exampleProfilePic.jpg";
import calculateAge from "../utils/calculateAge";
import ChatModal from "../components/chat-comp/ChatModal"; // adjust path
const Player = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Chat modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatUsername, setChatUsername] = useState(null);

  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(id);
        setDetails(user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!details) return <p>User not found.</p>;

  return (
    <div className="player bg-pnp-white pnp-shadow rounded-xl w-[95vw] min-w-[350px] max-w-[500px] px-4 mx-auto pb-6 mb-5">
      <div className="flex gap-2 mb-4 text-left">
        <img
          src={profilePic}
          className="rounded-full w-24 h-24 object-cover border-2 border-pnp-white pnp-shadow"
          alt="user"
        />
        <div>
          <h2 className="normal-case text-pnp-black">{details.userName}</h2>
          <p className="font-semibold">{details.tagline}</p>
          <p className="font-medium text-[#3E5466]">
            {details.address.postalCode} {details.address.city} |{" "}
            {calculateAge(details.birthday)} years
          </p>
        </div>
      </div>

      {/* Chat button */}
      <button
        onClick={() => openChat(details.userName)}
        className="btn-primary-light flex items-center justify-center p-2 rounded-lg hover:bg-pnp-purple hover:text-white transition-colors"
      >
        {/* Chat icon SVG */}
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

      <ChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chatId={selectedChatId}
        username={chatUsername}
      />
    </div>
  );
};

export default Player;
