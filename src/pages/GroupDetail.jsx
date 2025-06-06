import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getSingleGroup } from "../data/groups";
import WeekdaySelector from "../components/WeekdaySelector";
import CardAvailability from "../components/cards/CardAvailability";
import calculateAge from "../utils/calculateAge";
import TagMultiSelect from "../components/edit-comp/TagMultiSelect";
import like from "../assets/like_icon.svg";
import dislike from "../assets/dislike_icon.svg";
import getIcon from "../utils/getIcon";
import shortenExperienceLabel from "../utils/shortenExperience";

const GroupDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [showFullAbout, setShowFullAbout] = useState(false);
  // const [showFullDescription, setShowFullDescription] = useState(false);

  const MAX_LENGTH = 300;
  const toggleAboutText = () => setShowFullAbout((prev) => !prev);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSingleGroup(id);
        console.log("Fetched Group Data:", data);
        setGroupDetails(data);
      } catch (err) {
        console.error("Error fetching group:", err);
        setError("Failed to load group details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <p className="!text-pnp-white text-center py-8">
        Loading group details...
      </p>
    );
  }

  if (error) {
    return <p className="!text-pnp-white text-center py-8">{error}</p>;
  }

  if (!groupDetails) {
    return (
      <p className="!text-pnp-white text-center py-8">
        No group found with this ID.
      </p>
    );
  }

  // Check if User is Author of the Group
  // Ensure user and groupDetails.author are available before accessing properties
  const isAuthor =
    user && groupDetails.author && groupDetails.author._id === user._id;
  const isMember =
    user && groupDetails.members.some((member) => member._id === user._id);
  const canJoin =
    user &&
    !isAuthor &&
    !isMember &&
    groupDetails.members.length < groupDetails.maxMembers;

  const displayedAbout =
    showFullAbout || groupDetails.description.length <= MAX_LENGTH
      ? groupDetails.description
      : `${groupDetails.description.slice(0, MAX_LENGTH)}...`;

  // const descriptionText = groupDetails.description || "";
  // const truncatedDescription =
  //   showFullDescription || descriptionText.length <= MAX_DESCRIPTION_LENGTH
  //     ? descriptionText
  //     : `${descriptionText.slice(0, MAX_DESCRIPTION_LENGTH)}...`;

  const TagDisplay = ({ label, items }) => {
    if (!items || items.length === 0) {
      return null; // Don't render if no items
    }
  };

  return (
    <div className="min-h-screen md:p-8 text-pnp-white">
      {/* Main Card */}
      <div className="max-w-7xl px-5 mx-auto bg-white text-black rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row ">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[45%] p-6 border-b border-gray-100 lg:border-b-0 lg:border-r lg:border-gray-100">
          {/*
           */}
          {/* <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            /> */}
          <div>
            {groupDetails.image && (
              <div className="mb-4 -mx-12 lg:mx-0">
                <img
                  src={groupDetails.image}
                  alt={`${groupDetails.name} Group Image`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            <div className=" flex flex-col items-center text-center lg:items-start lg:text-left">
              <h3>{groupDetails.name}</h3>
              <small className="mt-2">
                "{groupDetails.tagline}" <br />
              </small>

              <div
                className={`mt-4 text-sm flex gap-2 ${
                  groupDetails.members.length >= groupDetails.maxMembers
                    ? "pnp-badge-white"
                    : "pnp-badge-green"
                }`}
              >
                {getIcon("User")} {groupDetails.members.length + 1} /{" "}
                {groupDetails.maxMembers + 1} {/* +1 for the author */}
              </div>

              <div className="flex flex-wrap mt-4 ">
                <div className="pnp-badge-purple">
                  {getIcon("Experience")}{" "}
                  {shortenExperienceLabel(groupDetails.experience.value)}
                </div>

                <div className="pnp-badge-blue">
                  {getIcon("On-site")} On-site
                </div>
              </div>

              <small className="text-gray-700 mt-4">
                {groupDetails.maxMembers - groupDetails.members.length} {""}{" "}
                open slots | {groupDetails.address.postalCode}{" "}
                {groupDetails.address.city}
              </small>

              <div className="mt-4 flex flex-wrap space-x-10">
                <h3 className="font-semibold text-sm uppercase">
                  Availability
                </h3>
                <p className="text-sm text-gray-700 ">
                  {groupDetails.frequencyPerMonth || "Not set"} x per month
                </p>

                <div className="mt-4 pointer-events-none">
                  <WeekdaySelector
                    weekdays={groupDetails.weekdays} // Pass the group's availability data
                    readOnly={true} // Crucially, set to true for display-only
                  />
                </div>
              </div>

              {/* <div className="flex justify-start flex-wrap gap-2 mt-2"></div>
               </div> 
              
              //   <WeekdaySelector */}
              {/* //     weekdays={groupDetails.weekdays} // Pass the group's availability data
              //     readOnly={true} // Crucially, set to true for display-only
              //   />
              // </div> */}
              <div className="flex mx-0 gap-4">
                <button className="btn-primary-dark w-auto h-auto mt-4 gap-2 mx-auto lg:mx-0">
                  Add Players
                </button>
                <button className="btn-primary-dark w-auto h-auto mt-4 gap-2 mx-auto lg:mx-0">
                  Edit Group
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}

        <div className="w-full lg:w-[55%] p-6 overflow-y-auto max-h-full">
          {/* Tabs */}
          <div className="mb-4">
            <div className="flex gap-4 font-semibold text-sm justify-center lg:justify-start">
              <button
                onClick={() => setActiveTab("about")}
                className={`pb-2 cursor-pointer ${
                  activeTab === "about"
                    ? "border-b-2 border-black"
                    : "text-gray-400"
                }`}
              >
                ABOUT
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`pb-2 cursor-pointer ${
                  activeTab === "groups"
                    ? "border-b-2 border-black"
                    : "text-gray-400"
                }`}
              >
                Players ()
              </button>
            </div>

            {activeTab === "about" && (
              // <p className="text-sm text-gray-700 mt-2">{user.about}</p>
              <>
                <p className="text-sm text-gray-700 mt-4 whitespace-pre-wrap">
                  {displayedAbout}
                </p>
                {groupDetails.description.length > MAX_LENGTH && (
                  <button
                    onClick={toggleAboutText}
                    className="mt-2 text-blue-600 font-semibold text-sm underline cursor-pointer"
                  >
                    {showFullAbout ? "Show less" : "Show more"}
                  </button>
                )}
              </>
            )}

            {activeTab === "players" && (
              <div className="text-sm text-gray-700 mt-2">
                <p>Group list and details go here.</p>
              </div>
            )}
          </div>

          {activeTab === "about" && (
            <>
              <h3 className="font-semibold text-sm uppercase mt-4">
                Playstyles
              </h3>
              <div className="pnp-badge-black text-sm mt-2">
                {groupDetails.playstyles.map((p) => p.label).join(", ") ||
                  "N/A"}
              </div>

              <h3 className="font-semibold text-sm uppercase mt-4">
                Game system
              </h3>
              <div className="pnp-badge-black text-sm mt-2">
                {groupDetails.systems.map((s) => s.label) || "N/A"}
              </div>

              <h3 className="font-semibold text-sm uppercase mt-4 flex gap-2">
                Likes
                <img src={like} alt="like icon" className="w-5 h-5 " />
              </h3>
              <div className="pnp-badge-white text-sm mt-2">
                {groupDetails.likes.map((l) => l.label).join(", ") ||
                  "None specified"}
              </div>

              <h3 className="font-semibold text-sm uppercase mt-4 flex gap-2">
                dislike
                <img src={dislike} alt="like icon" className="w-5 h-5 " />
              </h3>
              <div className="pnp-badge-white text-sm mt-2">
                {groupDetails.dislikes.map((d) => d.label).join(", ") ||
                  "None specified"}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
