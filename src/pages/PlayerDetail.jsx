import React, { useEffect, useState, useContext } from "react";
import send_icon from "../assets/send_icon.png";
import like from "../assets/like_icon.svg";
import dislike from "../assets/dislike_icon.svg";
import getIcon from "../utils/getIcon";
import TagMultiSelect from "../components/edit-comp/TagMultiSelect";
import calculateAge from "../utils/calculateAge";
import { useTagContext } from "../context/TagsContextProvider";
import SingleSelect from "../components/edit-comp/SingleSelect";
import shortenExperienceLabel from "../utils/shortenExperience";
import WeekdaySelector from "../components/WeekdaySelector";
import Loader from "../components/Loader";
import { getMyGroups } from "../data/user";
import Groupcard from "../components/cards/Groupcard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import ProfileChecker from "../components/player-comp/ProfileChecker";
import { toast } from "react-toastify";

const PlayerDetail = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const { setUser: setAuthUser } = useContext(AuthContext);

  const {
    systems: systemsOptions,
    languages: languagesOptions,
    playstyles: playstylesOptions,
    likes: likesOptions,
    dislikes: dislikesOptions,
    experienceLevel: experiencesOptions,
    playingRoles: playingRolesOptions,
    playingModes: playingModesOptions,
  } = useTagContext();

  const MAX_LENGTH = 300;

  const toggleAboutText = () => setShowFullAbout((prev) => !prev);

  const API_URL = import.meta.env.VITE_APP_PLOT_HOOK_API_URL;

  useEffect(() => {
    let data;
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        data = await res.json();
        //console.log("Fetched user data:", data);

        setUser(data);
        //console.log("Initial editedUser.experience:", data.experience);
        //console.log("Data from /auth/me:", data);

        setEditedUser({
          ...data,
          languages: data.languages || [],
          playstyles: data.playstyles || [],
          systems: data.systems || [],
          likes: data.likes || [],
          dislikes: data.dislikes || [],
          experience: data.experience || "",
          playingModes: data.playingModes || "",
          playingRoles: data.playingRoles || "",
        });

        const dataGroups = await getMyGroups();
        setGroups(dataGroups);
        //console.log("User Groups", dataGroups);
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    fetchUser();
  }, [isEditing]);

  const validateInput = () => {
    if (!editedUser.userName) {
      return "Please fill in your username.";
    }
    if (
      !editedUser.address.street ||
      !editedUser.address.houseNumber ||
      !editedUser.address.postalCode ||
      !editedUser.address.city
    )
      return "Please complete the address correctly.";

    if (!editedUser.birthday) return "Please fill in your birthday.";

    if (!editedUser.experience) return "Please select your experience.";

    if (editedUser.weekdays.length === 0)
      return "Please select at least one weekday.";

    if (editedUser.frequencyPerMonth < 1)
      return "Frequency per month must be at least 1.";

    if (editedUser.systems.length === 0)
      return "Please select at least one game system.";

    return null;
  };

  const handleSave = async () => {
    //console.log("editedUser.playstyles:", editedUser.playstyles);

    const error = validateInput();
    if (error) {
      toast.error(error);
      return;
    }

    const updateData = {
      userName: editedUser.userName,
      birthday: editedUser.birthday,
      address: {
        street: editedUser.address.street,
        houseNumber: editedUser.address.houseNumber,
        postalCode: editedUser.address.postalCode,
        city: editedUser.address.city,
        location: {
          type: "Point",
          coordinates: [
            user?.address?.location?.coordinates[0],
            user?.address?.location?.coordinates[1],
          ],
        },
      },

      experience: editedUser.experience?.id || editedUser.experience,

      playingModes: editedUser.playingModes?.id || editedUser.playingModes,

      systems: editedUser.systems?.map((system) => system.id || system) ?? [],
      weekdays: editedUser.weekdays,
      frequencyPerMonth: editedUser.frequencyPerMonth,
      avatarUrl: editedUser.avatarUrl,
      languages:
        editedUser.languages?.map((language) => language.id || language) ?? [],
      playstyles:
        editedUser.playstyles?.map((playstyle) => playstyle.id || playstyle) ??
        [],
      likes: editedUser.likes?.map((like) => like.id || like) ?? [],
      dislikes:
        editedUser.dislikes?.map((dislike) => dislike.id || dislike) ?? [],
      tagline: editedUser.tagline,
      description: editedUser.description,
    };

    const playingRoleId =
      editedUser.playingRoles?.id || editedUser.playingRoles;
    if (playingRoleId !== undefined && playingRoleId !== null) {
      updateData.playingRoles = playingRoleId;
    } else {
      updateData.playingRoles = null;
    }

    //console.log("Data being sent for update:",JSON.stringify(updateData, null, 2)); // Log the data being sent

    try {
      const res = await fetch(`${API_URL}/users/${editedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updateData),
      });
      if (!res.ok)
        throw new Error(
          `Failed to update profile: ${res.status} - ${await res.text()}`
        );
      const updated = await res.json();
      setUser(updated);
      setEditedUser(updated);
      setAuthUser(updated);

      setIsEditing(false);
    } catch (err) {
      const message = err.message || "";
      if (
        message.includes("Cast to ObjectId failed") &&
        message.includes("playingModes")
      ) {
        toast.error("Please set a playing mode");
      } else if (
        message.includes("Cast to ObjectId failed") &&
        message.includes("playingRole")
      ) {
        toast.error("Please set a playing role");
      } else {
        toast.error(message || "Please make sure all fields are filled out");
      }

      console.error(err);
    }
  };

  const handleCancel = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  if (!user) {
    return <div className="text-pnp-white p-4">Loading user...</div>;
  }

  const displayedAbout =
    showFullAbout || user.description.length <= MAX_LENGTH
      ? user.description
      : `${user.description.slice(0, MAX_LENGTH)}...`;

  const handleAvatarUpload = async (e) => {
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
        setEditedUser((prev) => ({
          ...prev,
          avatarUrl: data.fileUrl,
        }));
      } else {
        alert("Upload failed: " + data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during upload.");
    }
  };
  <Loader />;

  return (
    <div className="min-h-screen md:p-8 text-pnp-white">
      <div className="relative flex flex-col items-center justify-center max-w-7xl mx-auto bg-pnp-white text-pnp-black rounded-2xl shadow-xl overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-6 text-gray-600 hover:text-pnp-black text-xl cursor-pointer"
        >
          ✕
        </button>
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Section */}
          <div className="w-full lg:w-[45%] p-6 border-b border-gray-100 lg:border-b-0 lg:border-r lg:border-gray-100">
            <div className="flex flex-col items-center text-center gap-4 xl:flex-row lg:items-start lg:text-left">
              <div className="flex-shrink-0 ">
                {isEditing ? (
                  <>
                    <label htmlFor="avatar-upload">
                      <div className="relative">
                        <img
                          src={
                            previewImage ||
                            editedUser.avatarUrl ||
                            "https://i.ibb.co/F4MD88Lt/Ren-avatar.png"
                          }
                          alt="Avatar"
                          className="w-32 h-32 rounded-full border-4 border-pnp-white shadow-lg object-cover cursor-pointer"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-pnp-white opacity-80">
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
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </>
                ) : (
                  <img
                    src={
                      editedUser.avatarUrl ||
                      "https://i.ibb.co/F4MD88Lt/Ren-avatar.png"
                    }
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-pnp-white shadow-lg object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col items-center lg:items-start">
                {isEditing ? (
                  <>
                    <h3 className="font-semibold text-sm text-gray-700">
                      USERNAME
                    </h3>
                    <input
                      type="text"
                      value={editedUser.userName}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          userName: e.target.value,
                        }))
                      }
                      className="input-bordered w-[320px] capitalize"
                    />
                  </>
                ) : (
                  <h3>{editedUser.userName}</h3>
                )}
                {isEditing ? (
                  <>
                    <h3 className="font-semibold text-sm text-gray-700 mt-4">
                      TAGLINE
                    </h3>
                    <input
                      type="text"
                      placeholder="Tagline"
                      value={editedUser.tagline}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          tagline: e.target.value,
                        }))
                      }
                      className="input-bordered w-[320px]"
                    />
                  </>
                ) : (
                  <small className="mt-2">{editedUser.tagline}</small>
                )}

                {isEditing ? (
                  <>
                    <h3 className="font-semibold text-sm text-gray-700 mt-4">
                      ADDRESS
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <input
                        type="text"
                        value={editedUser.address?.street || ""}
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
                        className="input-bordered w-[320px] mb-0"
                      />
                      <input
                        type="text"
                        value={editedUser.address?.houseNumber || ""}
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
                        className="input-bordered w-[320px] mb-0"
                      />
                      <input
                        type="text"
                        value={editedUser.address?.postalCode || ""}
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
                        className="input-bordered w-[320px] mb-0"
                      />

                      <input
                        type="text"
                        value={editedUser.address?.city || ""}
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
                        className="input-bordered w-[320px]"
                      />
                      <div className=" w-full">
                        <h3 className="font-semibold text-sm text-gray-700">
                          BIRTHDAY
                        </h3>
                        <input
                          type="date"
                          className="input-bordered w-[320px]"
                          value={editedUser.birthday?.slice(0, 10) || ""}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              birthday: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-700 mt-2">
                    {(editedUser.address?.postalCode ||
                      editedUser.address?.street) && (
                      <span>
                        {editedUser.address?.postalCode || ""},{" "}
                        {editedUser.address?.city || ""}
                      </span>
                    )}
                    {editedUser.birthday && <span className="mx-1">|</span>}
                    {editedUser.birthday && (
                      <span>{calculateAge(editedUser.birthday)} years old</span>
                    )}
                  </div>
                )}

                <div className="mt-4">
                  {isEditing ? (
                    <div>
                      {/* EXPERIENCE */}
                      <div>
                        <h3 className="font-semibold text-sm text-gray-700">
                          EXPERIENCE
                        </h3>
                        <SingleSelect
                          category="experience"
                          value={editedUser.experience}
                          //className="input"
                          onChange={(selected) =>
                            setEditedUser({
                              ...editedUser,
                              experience: selected?.id,
                              // experience: selected,
                            })
                          }
                        />
                      </div>

                      {/* PLAYING MODES */}
                      <div className="mt-8">
                        <h3 className="font-semibold text-sm text-gray-700">
                          PLAYING MODES
                        </h3>
                        <SingleSelect
                          category="playingModes"
                          value={editedUser.playingModes}
                          //className="input"
                          onChange={(selected) =>
                            setEditedUser({
                              ...editedUser,
                              //playingModes: selected,
                              playingModes: selected?.id ?? null,
                            })
                          }
                        />
                      </div>

                      {/* PLAYING ROLES */}
                      <div className="w-[320px] mt-8">
                        <h3 className="font-semibold text-sm text-gray-700">
                          PLAYING ROLES
                        </h3>
                        <SingleSelect
                          category="playingRoles"
                          value={editedUser.playingRoles}
                          className="input"
                          onChange={(selected) =>
                            setEditedUser({
                              ...editedUser,
                              playingRoles: selected?.id ?? null,
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap text-center justify-center lg:justify-start items-center gap-2">
                      {editedUser.experience && (
                        <div className="pnp-badge-purple flex items-center gap-1">
                          {getIcon("Experience")}
                          {shortenExperienceLabel(
                            experiencesOptions.find(
                              (opt) =>
                                opt._id === editedUser.experience ||
                                opt._id === editedUser.experience?.id
                            )?.label ||
                              editedUser.experience?.label ||
                              editedUser.experience
                          )}
                        </div>
                      )}

                      {/* PLAYING MODES */}

                      {editedUser.playingModes && (
                        <div className="pnp-badge-blue flex items-center gap-1">
                          {(() => {
                            const label =
                              playingModesOptions.find(
                                (opt) =>
                                  opt._id === editedUser.playingModes ||
                                  opt._id === editedUser.playingModes?.id
                              )?.label ||
                              editedUser.playingModes?.label ||
                              editedUser.playingModes;

                            if (label === "Both") {
                              return (
                                <>
                                  {getIcon("On-site")}
                                  {getIcon("Online")}
                                </>
                              );
                            }

                            return getIcon(label);
                          })()}
                          {playingModesOptions.find(
                            (opt) =>
                              opt._id === editedUser.playingModes ||
                              opt._id === editedUser.playingModes?.id
                          )?.label ||
                            editedUser.playingModes?.label ||
                            editedUser.playingModes}
                        </div>
                      )}

                      {editedUser.playingRoles && (
                        <div className="pnp-badge-green flex items-center gap-1">
                          {getIcon("Dice")}
                          {playingRolesOptions.find(
                            (opt) =>
                              opt._id === editedUser.playingRoles ||
                              opt._id === editedUser.playingRoles?.id
                          )?.label ||
                            editedUser.playingRoles?.label ||
                            editedUser.playingRoles}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <div className="mt-4">
                      <h3 className="font-semibold text-sm text-gray-700 mb-2">
                        AVAILABILITY
                      </h3>
                      <WeekdaySelector
                        weekdays={editedUser.weekdays || []}
                        onChange={(updatedDays) => {
                          if (!isEditing) return;
                          setEditedUser((prev) => ({
                            ...prev,
                            weekdays: updatedDays,
                          }));
                        }}
                        readOnly={!isEditing}
                      />

                      <h3 className="font-semibold text-sm text-gray-700 mt-8">
                        FREQUENCY
                      </h3>
                      <div className="flex flex-row items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="31"
                          className="input-bordered mb-0 w-[70px]"
                          value={editedUser.frequencyPerMonth || ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              frequencyPerMonth: e.target.value,
                            })
                          }
                        />

                        <p className="text-sm text-gray-700 font-semibold w-[150px]">
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
                          {editedUser.frequencyPerMonth}x per month
                        </p>
                      </div>
                      <div className="mt-4 pointer-events-none">
                        <WeekdaySelector
                          weekdays={editedUser.weekdays} // Pass the group's availability data
                          readOnly={true} // Crucially, set to true for display-only
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {!isEditing && <ProfileChecker user={user} />}
                  {isEditing ? null : (
                    // View mode: Send DM and Edit buttons in the same row
                    <div className="flex gap-4 justify-center lg:justify-start">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary-light w-auto gap-2 flex"
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
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
                  GROUPS ({groups?.length || 0})
                </button>
              </div>

              {activeTab === "about" && (
                <>
                  {/* 📝 Description */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700">
                      MORE ABOUT ME
                    </h3>
                    {isEditing ? (
                      <textarea
                        className="w-full input-bordered mb-0"
                        value={editedUser.description}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <>
                        <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                          {displayedAbout}
                        </p>
                        {editedUser.description.length > MAX_LENGTH && (
                          <button
                            onClick={toggleAboutText}
                            className="mt-2 text-blue-600 font-semibold text-sm underline cursor-pointer"
                          >
                            {showFullAbout ? "Show less" : "Show more"}
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* 📚 Game Systems */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700">
                      GAME SYSTEMS
                    </h3>
                    {isEditing ? (
                      <TagMultiSelect
                        category="systems"
                        value={editedUser.systems}
                        onChange={(values) =>
                          setEditedUser({
                            ...editedUser,
                            systems: values.map((v) => v.id),
                          })
                        }
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(editedUser.systems || []).map((system) => {
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

                  {/* Languages */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700">
                      LANGUAGES
                    </h3>
                    {isEditing ? (
                      <TagMultiSelect
                        category="languages"
                        value={editedUser.languages}
                        onChange={(values) =>
                          setEditedUser({
                            ...editedUser,
                            languages: values.map((v) => v.id),
                          })
                        }
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(editedUser.languages || []).map((langId) => {
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

                  {/* 🎮 Playstyles */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700">
                      PLAYSTYLES
                    </h3>
                    {isEditing ? (
                      <TagMultiSelect
                        category="playstyles"
                        value={editedUser.playstyles}
                        onChange={(values) => {
                          // console.log("PlayerDetail playstyles onChange values:",values);
                          setEditedUser({
                            ...editedUser,
                            playstyles: values.map((v) => v.id),
                          });
                        }}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(editedUser.playstyles || []).map((style) => {
                          const playstyleOption = playstylesOptions?.find(
                            (opt) => opt._id === style
                          );
                          return playstyleOption ? (
                            <div className="pnp-badge-black" key={style}>
                              {getIcon(playstyleOption.label)}
                              {playstyleOption.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>

                  {/* Likes */}

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-gray-700 flex gap-2">
                        LIKES{" "}
                      </h3>
                      {/* <div className="flex items-start gap-2 mt-2"> */}
                      <img src={like} alt="like icon" className="w-5 h-5 " />
                    </div>

                    {/* <div className="flex flex-wrap gap-2"> */}
                    {isEditing ? (
                      <TagMultiSelect
                        category="likes"
                        value={editedUser.likes}
                        // selectedValues={editedUser.likes}
                        onChange={(values) =>
                          setEditedUser({
                            ...editedUser,
                            likes: values.map((v) => v.id),
                          })
                        }
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(editedUser.likes || []).map((likes) => {
                          const likeOption = likesOptions?.find(
                            (opt) => opt._id === likes
                          );
                          return likeOption ? (
                            <div className="pnp-badge-white" key={likes}>
                              {likeOption.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-gray-700 flex gap-2">
                        DISLIKES
                      </h3>

                      <img
                        src={dislike}
                        alt="dislike icon"
                        className="w-[17px]"
                      />
                    </div>

                    {isEditing ? (
                      <TagMultiSelect
                        category="dislikes"
                        value={editedUser.dislikes}
                        onChange={(values) => {
                          {
                            //console.log("editedUser.dislikes on render:",editedUser.dislikes);
                          }
                          setEditedUser({
                            ...editedUser,
                            dislikes: values.map((v) => v.id),
                          });
                        }}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(editedUser.dislikes || []).map((dislikes) => {
                          const dislikeOption = dislikesOptions?.find(
                            (opt) => opt._id === dislikes
                          );
                          return dislikeOption ? (
                            <div className="pnp-badge-white" key={dislikes}>
                              {dislikeOption.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === "groups" && (
                <div className="pt-4 flex flex-col justify-start items-start">
                  {groups?.map((e) => (
                    <Groupcard key={e._id} details={e} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {isEditing ? (
            // Edit mode: Save and Cancel buttons in the same row
            <div className="flex w-full gap-4 m-4">
              <button
                onClick={handleCancel}
                className="btn-secondary-dark text-pnp-black"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary-light px-5">
                Save
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
