import React, { useEffect, useState } from "react";
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

const PlayerDetail = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        console.log("Fetched user data:", data);

        setUser(data);
        console.log("Initial editedUser.experience:", data.experience);
        console.log("Data from /auth/me:", data);

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
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    console.log("editedUser.playstyles:", editedUser.playstyles);
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
      playingRoles: editedUser.playingRoles?.id || editedUser.playingRoles,

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

    console.log(
      "Data being sent for update:",
      JSON.stringify(updateData, null, 2)
    ); // Log the data being sent

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

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  if (!user) {
    return <div className="text-white p-4">Loading user...</div>;
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

  // if (!editedUser) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="min-h-screen md:p-8 text-pnp-white">
      <div className="max-w-7xl mx-auto bg-white text-black rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="w-full lg:w-[45%] p-6 border-b border-gray-100 lg:border-b-0 lg:border-r lg:border-gray-100">
          <div className="flex flex-col items-center text-center gap-4 lg:flex-row lg:items-start lg:text-left">
            <div className="flex-shrink-0 ">
              {isEditing ? (
                <>
                  <label htmlFor="avatar-upload">
                    <img
                      src={
                        previewImage ||
                        editedUser.avatarUrl ||
                        "https://i.ibb.co/F4MD88Lt/Ren-avatar.png"
                      }
                      alt="Avatar"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer"
                    />
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
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
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
                        editedUserName: e.target.value,
                      }))
                    }
                    className="input capitalize"
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
                    className="input"
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
                      className="input"
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
                      className="input"
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
                      className="input"
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
                      className="input"
                    />
                    <div className=" w-full">
                      <h3 className="font-semibold text-sm text-gray-700">
                        BIRTHDAY
                      </h3>
                      <input
                        type="date"
                        className="input"
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
                    <div>
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
                            playingModes: selected?.id,
                          })
                        }
                      />
                    </div>

                    {/* PLAYING ROLES */}
                    <div>
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
                            // playingRoles: selected,
                            playingRoles: selected?.id,
                          })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
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

              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700">
                  FREQUENCY
                </h3>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    max="31"
                    className="input"
                    value={editedUser.frequencyPerMonth}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        frequencyPerMonth: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-sm text-gray-700 font-semibold mt-2">
                    {editedUser.frequencyPerMonth || "Not set"} sessions per
                    Month
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-2">
                  AVIALABILITY
                </h3>

                <div className={!isEditing ? "pointer-events-none" : ""}>
                  <WeekdaySelector
                    weekdays={editedUser.weekdays || []}
                    onChange={(updatedDays) => {
                      if (!isEditing) return; // Prevent changes in view mode

                      const oldDays = editedUser.weekdays || [];
                      if (
                        updatedDays.length === oldDays.length &&
                        updatedDays.every((day) => oldDays.includes(day))
                      ) {
                        return;
                      }

                      setEditedUser((prev) => ({
                        ...prev,
                        weekdays: updatedDays,
                      }));
                    }}
                    readOnly={!isEditing}
                  />
                </div>
              </div>

              <div className="mt-4">
                {isEditing ? (
                  // Edit mode: Save and Cancel buttons in the same row
                  <div className="flex gap-4">
                    <button onClick={handleSave} className="btn-primary-dark">
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-primary-dark bg-gray-300 text-black hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  // View mode: Send DM and Edit buttons in the same row
                  <div className="flex gap-4">
                    <button className="btn-primary-dark w-auto gap-2 flex">
                      <img src={send_icon} alt="" />
                      Send DM
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-primary-dark w-auto gap-2 flex"
                    >
                      Edit
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
                    ? "border-b-2 border-black"
                    : "text-gray-400"
                }`}
              >
                MORE ABOUT ME
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`pb-2 cursor-pointer ${
                  activeTab === "groups"
                    ? "border-b-2 border-black"
                    : "text-gray-400"
                }`}
              >
                GROUPS ()
              </button>
            </div>

            {activeTab === "about" && (
              <>
                {/* 📝 Description */}
                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700">ABOUT</h3>
                  {isEditing ? (
                    <textarea
                      className="w-full border p-2 rounded"
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

                {/* Languages */}

                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700">
                    LANGUAGE
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
                        console.log(
                          "PlayerDetail playstyles onChange values:",
                          values
                        );
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
                            {playstyleOption.label}
                          </div>
                        ) : null;
                      })}
                    </div>
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
                      className="w-5 h-5 "
                    />
                  </div>

                  {isEditing ? (
                    <TagMultiSelect
                      category="dislikes"
                      value={editedUser.dislikes}
                      onChange={(values) => {
                        {
                          console.log(
                            "editedUser.dislikes on render:",
                            editedUser.dislikes
                          );
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
