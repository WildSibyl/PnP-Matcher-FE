import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getSingleGroup } from "../data/groups";
import WeekdaySelector from "../components/WeekdaySelector";
import CardAvailability from "../components/cards/CardAvailability";
import calculateAge from "../utils/calculateAge";
import TagMultiSelect from "../components/edit-comp/TagMultiSelect";
import SingleSelect from "../components/edit-comp/SingleSelect";
import like from "../assets/like_icon.svg";
import dislike from "../assets/dislike_icon.svg";
import getIcon from "../utils/getIcon";
import shortenExperienceLabel from "../utils/shortenExperience";
import { useTagContext } from "../context/TagsContextProvider";
import Loader from "../components/Loader";
import { useInviteModal } from "../context/InviteModalContextProvider";
import PlayerCard from "../components/cards/PlayerCard";
import PlayerCardSmall from "../components/cards/PlayerCardSmall";
import ChatModal from "../components/chat-comp/ChatModal";
import send_icon from "../assets/send_icon.png";

const GroupDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [groupDetails, setGroupDetails] = useState(null);
  const [editedGroup, setEditedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Chat modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const chatUsername = groupDetails?.author?.userName || "Unknown User";

  const {
    systems: systemsOptions,
    languages: languagesOptions,
    playstyles: playstylesOptions,
    likes: likesOptions,
    dislikes: dislikesOptions,
    groupExperience: experiencesOptions,
    playingModes: playingModesOptions, // Playing modes are not used in this component
  } = useTagContext();

  // const [showFullDescription, setShowFullDescription] = useState(false);
  const { openInviteModal } = useInviteModal();

  const MAX_LENGTH = 300;
  const toggleAboutText = () => setShowFullAbout((prev) => !prev);

  const openChat = (receiverId) => {
    setSelectedChatId(receiverId);
    setIsModalOpen(true);
  };

  const API_URL = import.meta.env.VITE_APP_PLOT_HOOK_API_URL;

  useEffect(() => {
    if (!id) return setLoading(false);

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSingleGroup(id);
        console.log("Group Data: ", data);
        setGroupDetails(data);
        setEditedGroup({
          ...data,
          playstyles: data.playstyles || [],
          systems: data.systems || [],
          likes: data.likes || [],
          dislikes: data.dislikes || [],
          experience: data.experience || "",
          weekdays: data.weekdays || [],
        });
      } catch (err) {
        console.error("Error fetching group:", err);
        setError("Failed to load group details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isAuthor =
    user && groupDetails?.author && groupDetails.author._id === user._id;

  const handleSave = async () => {
    try {
      const updateData = {
        name: editedGroup.name,
        tagline: editedGroup.tagline,
        description: editedGroup.description,
        experience: editedGroup.experience?.id || editedGroup.experience,
        playingModes: editedGroup.playingModes?.id || editedGroup.playingModes,
        systems: editedGroup.systems?.map((s) => s.id || s) ?? [],
        playstyles: editedGroup.playstyles?.map((p) => p.id || p) ?? [],
        likes: editedGroup.likes?.map((l) => l.id || l) ?? [],
        dislikes: editedGroup.dislikes?.map((d) => d.id || d) ?? [],
        frequencyPerMonth: editedGroup.frequencyPerMonth,
        languages:
          editedGroup.languages?.map((language) => language.id || language) ??
          [],
        weekdays: editedGroup.weekdays,
        address: {
          ...editedGroup.address,
        },
        image: editedGroup.image,
      };

      const res = await fetch(`${API_URL}/groups/${editedGroup._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error("Failed to update group");
      const updated = await res.json();
      setGroupDetails(updated);
      setEditedGroup(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleCancel = () => {
    setEditedGroup(groupDetails);
    setIsEditing(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setEditedGroup((prev) => ({ ...prev, image: data.fileUrl }));
      } else {
        alert("Upload failed: " + data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during upload.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-pnp-white text-center py-8">{error}</p>;
  if (!groupDetails)
    return (
      <p className="text-pnp-white text-center py-8">
        No group found with this ID.
      </p>
    );

  const displayedAbout =
    showFullAbout || editedGroup.description.length <= MAX_LENGTH
      ? editedGroup.description
      : `${editedGroup.description.slice(0, MAX_LENGTH)}...`;

  return (
    <>
      <div className="min-h-screen md:p-8 text-pnp-white">
        {/* Main Card */}
        <div className="relative max-w-7xl mx-auto bg-pnp-white text-pnp-black rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-6 text-gray-600 hover:text-pnp-black text-xl cursor-pointer"
          >
            ✕
          </button>
          <div className="flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="flex flex-col lg:w-[45%]">
              {/* Group image */}
              <div className="flex-shrink-0">
                {isEditing ? (
                  <label htmlFor="group-image-upload">
                    <div className="relative">
                      <img
                        src={previewImage || editedGroup.image}
                        alt="Group"
                        className="w-full h-[300px] shadow-lg object-cover cursor-pointer lg:h-[250px]"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-pnp-white opacity-70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                      </div>
                    </div>
                    <input
                      id="group-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                ) : (
                  <div className=" -mx-12 lg:mx-0">
                    <img
                      src={editedGroup.image}
                      alt={`${editedGroup.name} Group Image`}
                      className="w-full h-[300px] object-cover rounded-lg shadow-md lg:h-[250px]"
                    />
                  </div>
                )}
              </div>

              {/* Group details */}
              <div className="w-full p-6 border-b border-gray-100 lg:border-b-0 ">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="flex flex-1 flex-col items-center lg:items-start">
                    {isEditing ? (
                      <>
                        <h3 className="font-semibold text-sm text-gray-700">
                          GROUP NAME
                        </h3>
                        <input
                          type="text"
                          value={editedGroup.name}
                          onChange={(e) =>
                            setEditedGroup({
                              ...editedGroup,
                              name: e.target.value,
                            })
                          }
                          className="input capitalize"
                        />
                      </>
                    ) : (
                      <h3>{editedGroup.name}</h3>
                    )}

                    {isEditing ? (
                      <>
                        <h3 className="font-semibold text-sm text-gray-700 mt-4">
                          TAGLINE
                        </h3>
                        <input
                          type="text"
                          placeholder="Tagline"
                          value={editedGroup.tagline}
                          onChange={(e) =>
                            setEditedGroup({
                              ...editedGroup,
                              tagline: e.target.value,
                            })
                          }
                          className="input"
                        />
                      </>
                    ) : (
                      <small className="mt-2">{editedGroup.tagline}</small>
                    )}

                    {/* Groupcount, experience and Playing modes */}
                    <div className="mt-4">
                      {isEditing ? (
                        <div className="w-[320px]">
                          <h3 className="font-semibold text-sm text-gray-700">
                            EXPERIENCE
                          </h3>
                          <SingleSelect
                            category="experience"
                            value={editedGroup.experience}
                            onChange={(selected) =>
                              setEditedGroup({
                                ...editedGroup,
                                experience: selected?.id,
                              })
                            }
                          />
                          <h3 className="font-semibold text-sm text-gray-700">
                            PLAYING MODES
                          </h3>
                          <SingleSelect
                            category="playingModes"
                            value={editedGroup.playingModes}
                            //className="input"
                            onChange={(selected) =>
                              setEditedUser({
                                ...editedGroup,
                                //playingModes: selected,
                                playingModes: selected?.id,
                              })
                            }
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-wrap">
                            <div
                              className={`text-sm flex gap-2 ${
                                groupDetails.members.length >=
                                groupDetails.maxMembers
                                  ? "pnp-badge-white"
                                  : "pnp-badge-green"
                              }`}
                            >
                              {getIcon("User")}{" "}
                              {groupDetails.members.length + 1} /{" "}
                              {groupDetails.maxMembers + 1}{" "}
                              {/* +1 for the author */}
                            </div>

                            <div className="pnp-badge-purple">
                              {getIcon("Experience")}{" "}
                              {shortenExperienceLabel(
                                groupDetails.experience.value
                              )}
                            </div>

                            <div className="pnp-badge-blue">
                              {getIcon("On-site")} On-site
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Address and open slots */}
                    {isEditing ? (
                      <div className="flex flex-col w-full">
                        <h3 className="font-semibold text-sm text-gray-700">
                          YOUR ADDRESS
                        </h3>
                        <div className="flex flex-col gap-4 w-full">
                          <input
                            type="text"
                            value={editedGroup.address?.street || ""}
                            onChange={(e) =>
                              setEditedUser((prev) => ({
                                ...prev,
                                address: {
                                  ...prev.address,
                                  street: e.target.value,
                                },
                              }))
                            }
                            placeholder="Street"
                            className="input"
                          />
                          <input
                            type="text"
                            value={editedGroup.address?.houseNumber || ""}
                            onChange={(e) =>
                              setEditedUser((prev) => ({
                                ...prev,
                                address: {
                                  ...prev.address,
                                  houseNumber: e.target.value,
                                },
                              }))
                            }
                            placeholder="House Number"
                            className="input"
                          />
                          <input
                            type="text"
                            value={editedGroup.address?.postalCode || ""}
                            onChange={(e) =>
                              setEditedUser((prev) => ({
                                ...prev,
                                address: {
                                  ...prev.address,
                                  postalCode: e.target.value,
                                },
                              }))
                            }
                            placeholder="Postal Code"
                            className="input"
                          />

                          <input
                            type="text"
                            value={editedGroup.address?.city || ""}
                            onChange={(e) =>
                              setEditedUser((prev) => ({
                                ...prev,
                                address: {
                                  ...prev.address,
                                  city: e.target.value,
                                },
                              }))
                            }
                            placeholder="City"
                            className="input"
                          />
                        </div>
                      </div>
                    ) : (
                      <small className="text-gray-700 mt-4">
                        {groupDetails.maxMembers - groupDetails.members.length}{" "}
                        {""} open slots | {groupDetails.address.postalCode}{" "}
                        {groupDetails.address.city}
                      </small>
                    )}

                    {/* Availability and Frequency */}
                    <div>
                      {isEditing ? (
                        <div>
                          <h3 className="font-semibold text-sm text-gray-700 mb-2 mt-4">
                            AVAILABILITY
                          </h3>
                          <WeekdaySelector
                            weekdays={editedGroup.weekdays || []}
                            onChange={(updatedDays) => {
                              if (!isEditing) return;
                              setEditedGroup((prev) => ({
                                ...prev,
                                weekdays: updatedDays,
                              }));
                            }}
                            readOnly={!isEditing}
                          />

                          <h3 className="font-semibold text-sm text-gray-700 mt-5">
                            FREQUENCY
                          </h3>
                          <div className="flex flex-row items-center justify-center gap-2">
                            <input
                              type="number"
                              min="1"
                              max="31"
                              className="input w-[70px]"
                              value={editedGroup.frequencyPerMonth || ""}
                              onChange={(e) =>
                                setEditedGroup({
                                  ...editedGroup,
                                  frequencyPerMonth: e.target.value,
                                })
                              }
                            />

                            <p className="text-sm text-gray-700 font-semibold text-left w-[120px]">
                              times per month
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex flex-row items-center text-center gap-2 mt-4">
                            <h3 className="font-semibold text-sm text-gray-700">
                              AVAILABILITY
                            </h3>
                            <p className="text-sm text-gray-700 font-semibold">
                              {editedGroup.frequencyPerMonth}x per month
                            </p>
                          </div>
                          <div className="mt-4 pointer-events-none">
                            <WeekdaySelector
                              weekdays={editedGroup.weekdays} // Pass the group's availability data
                              readOnly={true} // Crucially, set to true for display-only
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Game master card and buttons*/}
                  {!isEditing && groupDetails?.author && (
                    <PlayerCardSmall details={groupDetails.author} />
                  )}
                </div>

                {isAuthor ? (
                  <div className="flex items-center justify-center w-full gap-4 mt-4">
                    {isEditing ? null : (
                      <>
                        <button
                          className="btn-primary-dark"
                          onClick={() =>
                            openInviteModal({ groupId: groupDetails._id })
                          }
                        >
                          Add Players
                        </button>

                        <button
                          onClick={() => setIsEditing(true)}
                          className="btn-primary-dark"
                        >
                          Edit Group
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full gap-4">
                    <button
                      onClick={() => openChat(groupDetails.author._id)}
                      className="btn-primary-dark w-auto gap-2 flex"
                    >
                      <img src={send_icon} alt="send icon" />
                      Send DM
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-[55%] p-6 overflow-y-auto max-h-full lg:border-l lg:border-gray-100">
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
                    onClick={() => setActiveTab("members")}
                    className={`pb-2 cursor-pointer ${
                      activeTab === "members"
                        ? "border-b-2 border-pnp-black"
                        : "text-gray-400"
                    }`}
                  >
                    MEMBERS ({groupDetails?.members?.length + 1})
                  </button>
                </div>

                {activeTab === "about" && (
                  <>
                    <h3 className="font-semibold text-sm text-gray-700 mt-4">
                      MORE ABOUT THIS GROUP
                    </h3>
                    {isEditing ? (
                      <>
                        <textarea
                          className="input w-full"
                          value={editedGroup.description}
                          onChange={(e) =>
                            setEditedGroup({
                              ...editedGroup,
                              description: e.target.value,
                            })
                          }
                        />
                      </>
                    ) : (
                      <p className="text-sm text-gray-700 mt-4 whitespace-pre-wrap">
                        ...to be filled in!
                      </p>
                    )}

                    <div className="mt-4">
                      <h3 className="font-semibold text-sm text-gray-700">
                        LANGUAGES
                      </h3>
                      {isEditing ? (
                        <TagMultiSelect
                          category="languages"
                          value={editedGroup.languages}
                          onChange={(values) =>
                            setEditedUser({
                              ...editedGroup,
                              languages: values.map((v) => v.id),
                            })
                          }
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(editedGroup.languages || []).map((langId) => {
                            const languageOption = languagesOptions?.find(
                              (opt) => opt._id === langId
                            );
                            return languageOption ? (
                              <div className="pnp-badge-black" key={langId}>
                                {languageOption.label}
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-sm text-gray-700 mt-4">
                      PLAYSTYLES
                    </h3>
                    {isEditing ? (
                      <TagMultiSelect
                        category="playstyles"
                        value={editedGroup.playstyles}
                        onChange={(values) =>
                          setEditedGroup({
                            ...editedGroup,
                            playstyles: values.map((v) => v.id),
                          })
                        }
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {editedGroup.playstyles.length > 0 ? (
                          editedGroup.playstyles.map((d) => {
                            const playstylesOption = playstylesOptions?.find(
                              (opt) => opt._id === d
                            );
                            return (
                              playstylesOption && (
                                <div key={d} className="pnp-badge-white">
                                  {playstylesOption.label}
                                </div>
                              )
                            );
                          })
                        ) : (
                          <div className="pnp-badge-white">None specified</div>
                        )}
                      </div>
                    )}

                    {/* 📚 Game Systems */}
                    <div className="mt-4">
                      <h3 className="font-semibold text-sm text-gray-700">
                        GAME SYSTEMS
                      </h3>
                      {isEditing ? (
                        <TagMultiSelect
                          category="systems"
                          value={editedGroup.systems}
                          onChange={(values) =>
                            setEditedUser({
                              ...editedGroup,
                              systems: values.map((v) => v.id),
                            })
                          }
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(editedGroup.systems || []).map((system) => {
                            const systemOption = systemsOptions?.find(
                              (opt) => opt._id === system
                            );
                            return systemOption ? (
                              <div className="pnp-badge-black" key={system}>
                                {systemOption.label}
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-sm text-gray-700 mt-4 flex gap-2">
                      LIKES <img src={like} alt="like" className="w-5 h-5" />
                    </h3>
                    {isEditing ? (
                      <TagMultiSelect
                        category="likes"
                        value={editedGroup.likes}
                        onChange={(values) =>
                          setEditedGroup({
                            ...editedGroup,
                            likes: values.map((v) => v.id),
                          })
                        }
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {editedGroup.likes.length > 0 ? (
                          editedGroup.likes.map((d) => {
                            const likeOption = likesOptions?.find(
                              (opt) => opt._id === d
                            );
                            return (
                              likeOption && (
                                <div key={d} className="pnp-badge-white">
                                  {likeOption.label}
                                </div>
                              )
                            );
                          })
                        ) : (
                          <div className="pnp-badge-white">None specified</div>
                        )}
                      </div>
                    )}

                    <h3 className="font-semibold text-sm text-gray-700 mt-4 flex gap-2">
                      DISLIKES{" "}
                      <img src={dislike} alt="dislike" className="w-5 h-5" />
                    </h3>
                    {isEditing ? (
                      <TagMultiSelect
                        category="dislikes"
                        value={editedGroup.dislikes}
                        onChange={(values) =>
                          setEditedGroup({
                            ...editedGroup,
                            dislikes: values.map((v) => v.id),
                          })
                        }
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex flex-wrap gap-2 mt-2">
                            {editedGroup.dislikes.length > 0 ? (
                              editedGroup.dislikes.map((d) => {
                                const dislikeOption = dislikesOptions?.find(
                                  (opt) => opt._id === d
                                );
                                return (
                                  dislikeOption && (
                                    <div key={d} className="pnp-badge-white">
                                      {dislikeOption.label}
                                    </div>
                                  )
                                );
                              })
                            ) : (
                              <div className="pnp-badge-white">
                                None specified
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {activeTab === "members" && (
                  <div className="pt-4 flex flex-col justify-start items-start">
                    {groupDetails?.author && (
                      <PlayerCard details={groupDetails?.author} />
                    )}

                    {groupDetails?.members?.map((e) => (
                      <PlayerCard key={e._id} details={e} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {isAuthor && (
            <div className="flex gap-4 m-4 self-center">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn-primary-dark">
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-primary-dark bg-gray-300 text-pnp-black"
                  >
                    Cancel
                  </button>
                </>
              ) : null}
            </div>
          )}
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

export default GroupDetail;
