import React from "react";
import { useState } from "react";
import roles_icon from "../assets/roles_icon.svg";
import send_icon from "../assets/send_icon.png";
import like from "../assets/like_icon.svg";
import dislike from "../assets/dislike_icon.svg";

const PlayerDetail = ({ user }) => {
  const [activeTab, setActiveTab] = useState("about");

  const [showFullAbout, setShowFullAbout] = useState(false);

  const toggleAboutText = () => setShowFullAbout((prev) => !prev);

  const MAX_LENGTH = 300; // character limit before truncation
  const aboutText = user.about;

  const displayedAbout =
    showFullAbout || aboutText.length <= MAX_LENGTH
      ? aboutText
      : `${aboutText.slice(0, MAX_LENGTH)}...`;

  const getBadgeColor = (role) => {
    const colorMap = {
      Player: "var(--color-pnp-green)",
      "Game Master": "#C59AFD",
      Rookie: "var(--color-pnp-blue)",
    };
    return colorMap[role] || "white";
  };

  const allDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  return (
    <div className="min-h-screen md:p-8 text-pnp-white">
      {/* Main Card */}
      <div className="max-w-7xl mx-auto bg-white text-black rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row ">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[40%] p-6 border-b border-gray-100 lg:border-b-0 lg:border-r lg:border-gray-100">
          <div className="flex flex-col items-center text-center gap-4 lg:flex-row lg:items-start lg:text-left">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <div className=" flex flex-col items-center text-center lg:items-start lg:text-left">
              <h3>{user.name}</h3>
              <small className="mt-2">
                "{user.quote}" <br />
              </small>
              <small className="text-gray-700">
                {user.location} | {user.age} years old
              </small>
              <div className="mt-4 font-medium flex flex-wrap gap-2">
                {user.roles.map((role) => (
                  <div
                    className="badge"
                    style={{ backgroundColor: getBadgeColor(role) }}
                    key={role}
                  >
                    <img src={roles_icon} alt="" />

                    {role}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap space-x-8">
                <h3 className="font-semibold text-sm text-gray-700">
                  Availability
                </h3>
                <small className="text-gray-700">{user.availability}</small>

                <div className="flex justify-start flex-wrap gap-2 mt-2">
                  {allDays.map((day) => {
                    const isActive = user.days.includes(day);
                    return (
                      <span
                        key={day}
                        className={`badge font-semibold ${
                          isActive
                            ? "bg-[var(--color-pnp-blue)] text-white"
                            : "bg-[#aadff3] text-white "
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

              <button className="btn-primary-dark w-auto h-auto mt-4 gap-2 mx-auto lg:mx-0">
                <img src={send_icon} alt="" />
                Send DM
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}

        <div className="w-full lg:w-[60%] p-6 overflow-y-auto max-h-full">
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
                GROUPS ()
              </button>
            </div>

            {activeTab === "about" && (
              // <p className="text-sm text-gray-700 mt-2">{user.about}</p>
              <>
                <p className="text-sm text-gray-700 mt-4 whitespace-pre-wrap">
                  {displayedAbout}
                </p>
                {aboutText.length > MAX_LENGTH && (
                  <button
                    onClick={toggleAboutText}
                    className="mt-2 text-blue-600 font-semibold text-sm underline cursor-pointer"
                  >
                    {showFullAbout ? "Show less" : "Show more"}
                  </button>
                )}
              </>
            )}

            {activeTab === "groups" && (
              <div className="text-sm text-gray-700 mt-2">
                <p>Group list and details go here.</p>
              </div>
            )}
          </div>

          {activeTab === "about" && (
            <>
              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700 ">
                  LANGUAGES
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.languages.map((flagUrl, index) => (
                    <img
                      key={index}
                      src={flagUrl}
                      alt={`Language ${index + 1}`}
                      className="w-10 h-6 rounded shadow"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700">
                  PLAYSTYLES
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.playstyles.map((style) => (
                    <div
                      className="badge badge-outline text-white bg-[#02080d]"
                      key={style}
                    >
                      {style}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700">
                  GAME SYSTEMS
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.gameSystems.map((system) => (
                    <div
                      className="badge badge-outline text-white bg-[#02080d]"
                      key={system}
                    >
                      {system}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-700">
                  PREFERENCES
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <img src={like} alt="" />
                  {user.likes.map((like) => (
                    <div className="badge bg-gray-100" key={like}>
                      {like}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <img src={dislike} alt="" />
                  {user.dislikes.map((dislike) => (
                    <div className="badge bg-gray-100" key={dislike}>
                      {dislike}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default PlayerDetail;
