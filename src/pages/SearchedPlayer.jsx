import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../data/user";
import { useTagContext } from "../context/TagsContextProvider";
import { useNavigate } from "react-router-dom";
import calculateAge from "../utils/calculateAge";
import ChatModal from "../components/chat-comp/ChatModal";
import like from "../assets/like_icon.svg";
import dislike from "../assets/dislike_icon.svg";
import getIcon from "../utils/getIcon";
import send_icon from "../assets/send_icon.png";
import shortenExperienceLabel from "../utils/shortenExperience";
import InviteToGroupModal from "../components/InviteToGroupModal";
import { useInviteModal } from "../context/InviteModalContextProvider";
import { getSingleGroup } from "../data/groups";
import GroupCard from "../components/cards/Groupcard";

const SearchedPlayer = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [showFullAbout, setShowFullAbout] = useState(false);
  const {
    systems,
    languages,
    playstyles,
    likes,
    dislikes,
    experienceLevel,
    playingRoles,
    playingModes,
  } = useTagContext();

  const { openInviteModal } = useInviteModal();

  // Chat modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatUsername, setChatUsername] = useState(null);
  const [groups, setGroups] = useState([]);
  const toggleAboutText = () => setShowFullAbout((prev) => !prev);
  const navigate = useNavigate();

  const MAX_LENGTH = 300;

  const openChat = (receiverId) => {
    setSelectedChatId(receiverId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // const fetchGroups = async (id) => {
    //   try {
    //     const data = await getSingleGroup(id);
    //     console.log("Groupdata: ", data);
    //     //set Groups and make sure each group is only displayed once
    //     setGroups((prev) => {
    //       const safeGroups = prev || [];
    //       if (safeGroups.find((g) => g._id === data._id)) return safeGroups;
    //       return [...safeGroups, data];
    //     });
    //   } catch (error) {
    //     console.log("User group could not be fetched ", error);
    //   }
    // };

    const fetchData = async () => {
      try {
        const user = await getUserById(id);
        console.log("User ", user);
        setDetails(user);
        setChatUsername(user.userName);
        // await Promise.all(
        //   (user?.groups || []).map((groupId) => fetchGroups(groupId))
        // );
      } catch (err) {
        console.error("Fetch error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!details) return <p>User not found.</p>;

  const displayedAbout =
    showFullAbout || details.description.length <= MAX_LENGTH
      ? details.description
      : `${details.description.slice(0, MAX_LENGTH)}...`;

  const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  const getDayStyle = (isSelected) => ({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "44px",
    height: "34px",
    borderRadius: "8px",
    cursor: "default",
    userSelect: "none",
    backgroundColor: isSelected ? "#4FCFFF" : "#A7E7FF",
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
    boxShadow: isSelected
      ? "0 4px 2px rgba(100, 100, 100, 0.5)"
      : "0 4px 2px rgba(100, 100, 100, 0.2)",
    transition: "box-shadow 0.3s ease",
    margin: "2px",
  });

  console.log("Details weekdays:", details.weekdays);

  return (
    <>
      <div className="min-h-screen md:p-8 text-pnp-white">
        <div className="relative max-w-7xl mx-auto bg-pnp-white text-pnp-black rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-6 text-gray-600 hover:text-pnp-black text-xl"
          >
            ✕
          </button>
          {/* Left Section */}
          <div className="w-full lg:w-[45%] p-6 border-b border-gray-100 lg:border-b-0 lg:border-r lg:border-gray-100">
            {/* <div className="flex flex-col items-center text-center gap-4 lg:flex-row lg:items-start lg:text-left"> */}
            <div className="flex flex-col lg:flex-row items-start gap-4">
              <div className="flex-shrink-0">
                <label htmlFor="avatar-upload">
                  <img
                    src={details.avatarUrl}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-pnp-white shadow-lg object-cover cursor-pointer"
                  />
                </label>
              </div>

              <div className="flex flex-1 flex-col items-center lg:items-start">
                <h3>{details.userName}</h3>

                <small className="mt-2">{details.tagline}</small>

                <div className="text-sm text-gray-700 mt-2">
                  {details.address?.postalCode && (
                    <span>{details.address?.postalCode || ""},</span>
                  )}
                  {details.birthday && <span className="mx-1">|</span>}
                  {details.birthday && (
                    <span>{calculateAge(details.birthday)} years old</span>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* EXPERIENCE */}
                    {details.experience && (
                      <div className="pnp-badge-purple">
                        {getIcon("Experience")}{" "}
                        {shortenExperienceLabel(details.experience?.value)}
                      </div>
                    )}

                    {/* PLAYING MODES */}
                    {details.playingModes && (
                      <div className="pnp-badge-blue">
                        {getIcon(details.playingModes?.value)}{" "}
                        {details.playingModes?.value === "Both" &&
                          getIcon("Online")}{" "}
                        {details.playingModes?.value}
                      </div>
                    )}

                    {/* PLAYING ROLES */}
                    {details.playingRoles && (
                      <div className="pnp-badge-green">
                        {getIcon("Dice")} {details.playingRoles?.value}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700">
                    Frequency
                  </h3>

                  <p className="text-sm text-gray-700 mt-2">
                    {details.frequencyPerMonth || "Not set"}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700">
                    WEEKDAYS
                  </h3>

                  {daysOfWeek.map((day) => {
                    const isSelected = details.weekdays.includes(day);

                    return (
                      <div key={day} style={getDayStyle(isSelected)}>
                        {day}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4">
                  {/* Send DM button */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => openChat(details._id)}
                      className="btn-primary-dark w-auto gap-2 flex"
                    >
                      <img src={send_icon} alt="send icon" />
                      Send DM
                    </button>
                    {/* Invite to Group button */}
                    <button
                      onClick={() => openInviteModal({ userId: details })}
                      className="btn-primary-dark w-auto gap-2 flex"
                    >
                      Invite to Group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}

          <div className="w-full lg:w-[55%] p-6 overflow-y-auto max-h-full">
            <div className="mb-4">
              <div className="flex gap-4 font-semibold text-sm justify-center lg:justify-start">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`pb-2 cursor-pointer ${
                    activeTab === "about"
                      ? "border-b-2 border-pnp-black"
                      : "text-gray-400"
                  }`}
                >
                  ABOUT
                </button>
                <button
                  onClick={() => setActiveTab("groups")}
                  className={`pb-2 cursor-pointer ${
                    activeTab === "groups"
                      ? "border-b-2 border-pnp-black"
                      : "text-gray-400"
                  }`}
                >
                  GROUPS ({details?.groups?.length})
                </button>
              </div>

              {activeTab === "about" && (
                <>
                  {/* 📝 Description */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700">
                      ABOUT
                    </h3>
                    <>
                      <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                        {displayedAbout}
                      </p>
                      {details.description.length > MAX_LENGTH && (
                        <button
                          onClick={toggleAboutText}
                          className="mt-2 text-blue-600 font-semibold text-sm underline cursor-pointer"
                        >
                          {showFullAbout ? "Show less" : "Show more"}
                        </button>
                      )}
                    </>
                  </div>

                  {/* Languages */}

                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700">
                      Language
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {details.languages.map((level) => (
                        <div className="pnp-badge-black" key={level._id}>
                          {level.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 🎮 Playstyles */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700">
                      PLAYSTYLES
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {details.playstyles.map((level) => (
                        <div className="pnp-badge-black" key={level._id}>
                          {level.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 📚 Game Systems */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700">
                      GAME SYSTEMS
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {details.systems.map((level) => (
                        <div className="pnp-badge-black" key={level._id}>
                          {level.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Likes */}

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-gray-700 flex gap-2">
                        LIKES{" "}
                      </h3>

                      <img src={like} alt="like icon" className="w-5 h-5 " />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {details.likes.map((level) => (
                        <div className="pnp-badge-white" key={level._id}>
                          {level.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-gray-700 flex gap-2">
                        DISLIKES
                      </h3>

                      <img
                        src={dislike}
                        alt="dislike icon"
                        className="w-5 h-5 "
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {details.dislikes.map((level) => (
                        <div className="pnp-badge-white" key={level._id}>
                          {level.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "groups" && (
                <div className="pt-4 flex flex-col justify-start items-start">
                  {details?.groups?.map((e) => (
                    <GroupCard key={e._id} details={e} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        receiverId={selectedChatId}
        username={chatUsername}
      />
    </>
  );
};

export default SearchedPlayer;
