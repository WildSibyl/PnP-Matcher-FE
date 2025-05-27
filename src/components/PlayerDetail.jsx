// import React from "react";
// import { useState } from "react";
// import roles_icon from "../assets/roles_icon.svg";
// import send_icon from "../assets/send_icon.png";
// import like from "../assets/like_icon.svg";
// import dislike from "../assets/dislike_icon.svg";

// const PlayerDetail = ({ user }) => {
//   const [activeTab, setActiveTab] = useState("about");

//   const [showFullAbout, setShowFullAbout] = useState(false);

//   const toggleAboutText = () => setShowFullAbout((prev) => !prev);

//   const MAX_LENGTH = 300; // character limit before truncation
//   const aboutText = user.about;

//   const displayedAbout =
//     showFullAbout || aboutText.length <= MAX_LENGTH
//       ? aboutText
//       : `${aboutText.slice(0, MAX_LENGTH)}...`;

//   const getBadgeColor = (role) => {
//     const colorMap = {
//       Player: "var(--color-pnp-green)",
//       "Game Master": "#C59AFD",
//       Rookie: "var(--color-pnp-blue)",
//     };
//     return colorMap[role] || "white";
//   };

//   const allDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

//   return (
//     <div className="min-h-screen md:p-8 text-pnp-white">
//       {/* Main Card */}
//       <div className="max-w-7xl mx-auto bg-white text-black rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row ">
//         {/* Left Sidebar */}
//         <div className="w-full lg:w-[40%] p-6 border-b border-gray-100 lg:border-b-0 lg:border-r lg:border-gray-100">
//           <div className="flex flex-col items-center text-center gap-4 lg:flex-row lg:items-start lg:text-left">
//             <img
//               src={user.avatarUrl}
//               alt="Avatar"
//               className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//             />
//             <div className=" flex flex-col items-center text-center lg:items-start lg:text-left">
//               <h3>{user.name}</h3>
//               <small className="mt-2">
//                 "{user.quote}" <br />
//               </small>
//               <small className="text-gray-700">
//                 {user.location} | {user.age} years old
//               </small>
//               <div className="mt-4 font-medium flex flex-wrap gap-2">
//                 {user.roles.map((role) => (
//                   <div
//                     className="badge"
//                     style={{ backgroundColor: getBadgeColor(role) }}
//                     key={role}
//                   >
//                     <img src={roles_icon} alt="" />

//                     {role}
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 flex flex-wrap space-x-8">
//                 <h3 className="font-semibold text-sm text-gray-700">
//                   Availability
//                 </h3>
//                 <small className="text-gray-700">{user.availability}</small>

//                 <div className="flex justify-start flex-wrap gap-2 mt-2">
//                   {allDays.map((day) => {
//                     const isActive = user.weekdays.includes(day);
//                     return (
//                       <span
//                         key={day}
//                         className={`badge font-semibold ${
//                           isActive
//                             ? "bg-[var(--color-pnp-blue)] text-white"
//                             : "bg-[#aadff3] text-white "
//                         }`}
//                       >
//                         {day}
//                       </span>
//                     );
//                   })}
//                 </div>
//               </div>

//               <button className="btn-primary-dark w-auto h-auto mt-4 gap-2 mx-auto lg:mx-0">
//                 <img src={send_icon} alt="" />
//                 Send DM
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Content Area */}

//         <div className="w-full lg:w-[60%] p-6 overflow-y-auto max-h-full">
//           {/* Tabs */}
//           <div className="mb-4">
//             <div className="flex gap-4 font-semibold text-sm justify-center lg:justify-start">
//               <button
//                 onClick={() => setActiveTab("about")}
//                 className={`pb-2 cursor-pointer ${
//                   activeTab === "about"
//                     ? "border-b-2 border-black"
//                     : "text-gray-400"
//                 }`}
//               >
//                 ABOUT
//               </button>
//               <button
//                 onClick={() => setActiveTab("groups")}
//                 className={`pb-2 cursor-pointer ${
//                   activeTab === "groups"
//                     ? "border-b-2 border-black"
//                     : "text-gray-400"
//                 }`}
//               >
//                 GROUPS ()
//               </button>
//             </div>

//             {activeTab === "about" && (
//               // <p className="text-sm text-gray-700 mt-2">{user.about}</p>
//               <>
//                 <p className="text-sm text-gray-700 mt-4 whitespace-pre-wrap">
//                   {displayedAbout}
//                 </p>
//                 {aboutText.length > MAX_LENGTH && (
//                   <button
//                     onClick={toggleAboutText}
//                     className="mt-2 text-blue-600 font-semibold text-sm underline cursor-pointer"
//                   >
//                     {showFullAbout ? "Show less" : "Show more"}
//                   </button>
//                 )}
//               </>
//             )}

//             {activeTab === "groups" && (
//               <div className="text-sm text-gray-700 mt-2">
//                 <p>Group list and details go here.</p>
//               </div>
//             )}
//           </div>

//           {activeTab === "about" && (
//             <>
//               <div className="mt-4">
//                 <h3 className="font-semibold text-sm text-gray-700 ">
//                   LANGUAGES
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {user.languages.map((flagUrl, index) => (
//                     <img
//                       key={index}
//                       src={flagUrl}
//                       alt={`Language ${index + 1}`}
//                       className="w-10 h-6 rounded shadow"
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <h3 className="font-semibold text-sm text-gray-700">
//                   PLAYSTYLES
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {user.playstyles.map((style) => (
//                     <div
//                       className="badge badge-outline text-white bg-[#02080d]"
//                       key={style}
//                     >
//                       {style}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <h3 className="font-semibold text-sm text-gray-700">
//                   GAME SYSTEMS
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {user.gameSystems.map((system) => (
//                     <div
//                       className="badge badge-outline text-white bg-[#02080d]"
//                       key={system}
//                     >
//                       {system}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <h3 className="font-semibold text-sm text-gray-700">
//                   PREFERENCES
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   <img src={like} alt="" />
//                   {user.likes.map((like) => (
//                     <div className="badge bg-gray-100" key={like}>
//                       {like}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   <img src={dislike} alt="" />
//                   {user.dislikes.map((dislike) => (
//                     <div className="badge bg-gray-100" key={dislike}>
//                       {dislike}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PlayerDetail;

import React, { useEffect, useState } from "react";
import roles_icon from "../assets/roles_icon.svg";
import send_icon from "../assets/send_icon.png";
import like from "../assets/like_icon.svg";
import dislike from "../assets/dislike_icon.svg";
import TagMultiSelect from "../components/edit-comp/TagMultiSelect";
import calculateAge from "../utils/calculateAge";
import profile from "../assets/profile.png";
//import AvatarProfile from "./player-details/AvatarProfile";

const PlayerDetail = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const MAX_LENGTH = 300;

  const toggleAboutText = () => setShowFullAbout((prev) => !prev);

  const getBadgeColor = (role) => {
    const colorMap = {
      Player: "var(--color-pnp-green)",
      "Game Master": "#C59AFD",
      Rookie: "var(--color-pnp-blue)",
    };
    return colorMap[role] || "white";
  };

  const allDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/auth/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
        setEditedUser(data);
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Failed to update profile");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setSelectedFile(file);

      // You might also want to update the `user.avatarUrl` temporarily
      setUser((prev) => ({
        ...prev,
        avatarUrl: imageUrl,
      }));
    }
  };

  return (
    <div className="min-h-screen md:p-8 text-pnp-white">
      <div className="max-w-7xl mx-auto bg-white text-black rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="w-full lg:w-[40%] p-6 border-b border-gray-100 lg:border-b-0 lg:border-r lg:border-gray-100">
          <div className="flex flex-col items-center text-center gap-4 lg:flex-row lg:items-start lg:text-left">
            <label htmlFor="avatar-upload">
              <img
                src={previewImage || user.avatarUrl || profile}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer"
              />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div className="flex flex-col items-center lg:items-start">
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.userName}
                  onChange={(e) =>
                    setEditedUser((prev) => ({
                      ...prev,
                      editedUserName: e.target.value,
                    }))
                  }
                  className="input capitalize "
                />
              ) : (
                <h3>{editedUser.userName}</h3>
              )}
              {isEditing ? (
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
                  className="input mt-4"
                />
              ) : (
                <small className="mt-2">"{editedUser.tagline}"</small>
              )}

              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedUser.zipCode}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    className="input mt-4"
                  />
                  <input
                    type="text"
                    value={editedUser.country}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                    className="input mt-2"
                  />
                </>
              ) : (
                <small className="text-gray-700">
                  {editedUser.zipCode}, {editedUser.country}
                </small>
              )}

              <div className="mt-2">
                {isEditing ? (
                  <input
                    type="date"
                    className="input"
                    value={editedUser.birthday?.slice(0, 10) || ""}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        birthday: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-sm text-gray-700 mt-2">
                    {editedUser.birthday
                      ? `${calculateAge(editedUser.birthday)} years old`
                      : "Age unknown"}
                  </p>
                )}
              </div>

              <div className="mt-2">
                {isEditing ? (
                  <TagMultiSelect
                    category="experience"
                    selectedValues={editedUser.experience}
                    onChange={(values) =>
                      setEditedUser({ ...editedUser, experience: values })
                    }
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(editedUser.experience || []).map((experiences) => (
                      <div
                        className="badge badge-outline text-white bg-[#02080d]"
                        key={experiences}
                      >
                        {experiences}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700">
                  Frequency
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
                  <p className="text-sm text-gray-700 mt-2">
                    {editedUser.frequencyPerMonth || "Not set"}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700">
                  AVAILABILITY
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allDays.map((day) => {
                    const isActive = editedUser.weekdays?.includes(day);
                    const toggleDay = () => {
                      const updatedDays = isActive
                        ? editedUser.weekdays.filter((d) => d !== day)
                        : [...(editedUser.weekdays || []), day];
                      setEditedUser({ ...editedUser, weekdays: updatedDays });
                    };

                    return isEditing ? (
                      <button
                        key={day}
                        onClick={toggleDay}
                        type="button"
                        className={`badge font-semibold px-3 py-1 rounded-full ${
                          isActive
                            ? "bg-[var(--color-pnp-blue)] text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {day}
                      </button>
                    ) : (
                      <span
                        key={day}
                        className={`badge font-semibold ${
                          isActive
                            ? "bg-[var(--color-pnp-blue)] text-white"
                            : "bg-[#aadff3] text-white"
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

              <button className="btn-primary-dark w-auto h-auto mt-4 gap-2 mx-auto lg:mx-0 flex">
                <img src={send_icon} alt="" />
                Send DM
              </button>

              {isEditing ? (
                <div className="flex gap-4 mt-4">
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
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary-dark w-auto h-auto mt-4 gap-2 mx-auto lg:mx-0 "
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}

        <div className="w-full lg:w-[60%] p-6 overflow-y-auto max-h-full">
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
                  <h3 className="font-semibold text-sm text-gray-700">Lang</h3>
                  {isEditing ? (
                    <TagMultiSelect
                      category="languages"
                      selectedValues={editedUser.languages}
                      onChange={(values) =>
                        setEditedUser({ ...editedUser, languages: values })
                      }
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editedUser.languages || []).map((language) => (
                        <div
                          className="badge badge-outline text-white bg-[#02080d]"
                          key={language}
                        >
                          {language}
                        </div>
                      ))}
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
                      selectedValues={editedUser.playstyles}
                      onChange={(values) =>
                        setEditedUser({ ...editedUser, playstyles: values })
                      }
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editedUser.playstyles || []).map((style) => (
                        <div
                          className="badge badge-outline text-white bg-[#02080d]"
                          key={style}
                        >
                          {style}
                        </div>
                      ))}
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
                      selectedValues={editedUser.systems}
                      onChange={(values) =>
                        setEditedUser({ ...editedUser, systems: values })
                      }
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editedUser.systems || []).map((system) => (
                        <div
                          className="badge badge-outline text-white bg-[#02080d]"
                          key={system}
                        >
                          {system}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Likes */}

                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700 flex gap-2">
                    LIKES
                    {/* <div className="flex items-start gap-2 mt-2"> */}
                    <img src={like} alt="like icon" className="w-5 h-5 mt-1" />
                  </h3>
                  {/* <div className="flex flex-wrap gap-2"> */}
                  {isEditing ? (
                    <TagMultiSelect
                      category="likes"
                      selectedValues={editedUser.likes}
                      onChange={(values) =>
                        setEditedUser({ ...editedUser, likes: values })
                      }
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editedUser.likes || []).map((likeItem) => (
                        <div
                          className="badge bg-gray-100 text-black"
                          key={likeItem}
                        >
                          {likeItem}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* </div> */}
                {/* </div> */}

                {/* Dislikes */}

                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-700 flex gap-2">
                    DISLIKES
                    <img
                      src={dislike}
                      alt="dislike icon"
                      className="w-5 h-5 mt-1"
                    />
                  </h3>

                  {isEditing ? (
                    <TagMultiSelect
                      category="dislikes"
                      selectedValues={editedUser.dislikes}
                      onChange={(values) =>
                        setEditedUser({ ...editedUser, dislikes: values })
                      }
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editedUser.dislikes || []).map((dislikeItem) => (
                        <div
                          className="badge bg-gray-100 text-black"
                          key={dislikeItem}
                        >
                          {dislikeItem}
                        </div>
                      ))}
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
