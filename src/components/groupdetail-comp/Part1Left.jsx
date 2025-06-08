import WeekdaySelector from "../WeekdaySelector";
import SingleSelect from "../edit-comp/SingleSelect";
import getIcon from "../../utils/getIcon";
import shortenExperienceLabel from "../../utils/shortenExperience";
import { useTagContext } from "../../context/TagsContextProvider";
import PlayerCard from "../cards/PlayerCard";
import PlayerCardSmall from "../cards/PlayerCardSmall";
import send_icon from "../../assets/send_icon.png";
import CharCountInput from "../edit-comp/CharCountInput";
import TakeOverValues from "../group-comp/TakeOverValues";
import GroupnameInput from "../edit-comp/GroupnameInput";
import AiTextSuggest from "../group-comp/AiTextSuggest";

const Part1Left = ({
  isEditing,
  setIsEditing,
  editedGroup,
  setEditedGroup,
  groupDetails,
  isAuthor,
  openInviteModal,
  openChat,
  previewImage,
  handleImageUpload,
  onChange,
}) => {
  const { groupExperience } = useTagContext();

  return (
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
                  className="size-6"
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
                <div className="flex gap-2 items-center w-[320px]">
                  <div className="flex-grow relative">
                    <GroupnameInput
                      name="name"
                      value={editedGroup.name}
                      onChange={onChange}
                      maxLength={50}
                      placeholder="Your group name"
                    />
                  </div>
                  <div className="self-center -mt-3">
                    <AiTextSuggest
                      onChange={onChange}
                      prompt="very short pen&paper group name"
                      name="name"
                    />
                  </div>
                </div>
              </>
            ) : (
              <h3>{editedGroup.name}</h3>
            )}

            {isEditing ? (
              <>
                <h3 className="font-semibold text-sm text-gray-700 mt-4">
                  TAGLINE
                </h3>
                <div className="flex gap-2 items-center w-[320px]">
                  <div className="flex-grow relative">
                    <CharCountInput
                      name="tagline"
                      value={editedGroup.tagline}
                      onChange={onChange}
                      maxLength={150}
                      placeholder="A short tagline for your group"
                    />
                  </div>
                  <div className="self-center -mt-3">
                    {" "}
                    <AiTextSuggest
                      onChange={onChange}
                      prompt="very short cool tagline"
                      name="tagline"
                    />
                  </div>
                </div>
              </>
            ) : (
              <small className="mt-2">{editedGroup.tagline}</small>
            )}

            {/* Groupcount, experience and Playing modes */}
            <div>
              {isEditing ? (
                <div className="w-[320px]">
                  <div className="flex flex-row justify-between">
                    <h3 className="font-semibold text-sm text-gray-700">
                      MAX MEMBERS
                    </h3>
                  </div>
                  <div className="flex flex-row gap-2">
                    <input
                      type="number"
                      name="maxMembers"
                      className="input-bordered mb-0"
                      value={editedGroup.maxMembers}
                      onChange={onChange}
                      max={30}
                      min={1}
                    />
                    {editedGroup.maxMembers < 1 ||
                    editedGroup.maxMembers > 30 ? (
                      <p className="text-red-500 text-sm mt-1">
                        Party members must be between 1 and 30.
                      </p>
                    ) : (
                      <p className="text-gray-400 font-normal text-sm mt-1">
                        Your ideal party size, excluding you. We recommend 4.
                      </p>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-700 mt-4">
                    EXPERIENCE
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="flex-grow relative">
                      <select
                        name="experience"
                        value={editedGroup.experience}
                        onChange={onChange}
                        className="input-bordered-multi flex-grow !w-full px-2"
                      >
                        <option value="">Select experience</option>
                        {groupExperience.map((level) => (
                          <option key={level._id} value={level._id}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="self-center -mt-3">
                      <TakeOverValues onChange={onChange} name={"experience"} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-700">
                    PLAYING MODES
                  </h3>
                  <SingleSelect
                    category="playingModes"
                    value={editedGroup.playingModes}
                    onChange={(selected) =>
                      setEditedGroup({
                        ...editedGroup,
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
                        groupDetails.members.length >= groupDetails.maxMembers
                          ? "pnp-badge-white"
                          : "pnp-badge-green"
                      }`}
                    >
                      {getIcon("User")} {groupDetails.members.length + 1} /{" "}
                      {groupDetails.maxMembers + 1} {/* +1 for the author */}
                    </div>

                    <div className="pnp-badge-purple">
                      {getIcon("Experience")}{" "}
                      {shortenExperienceLabel(groupDetails.experience.value)}
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
              <>
                <div className="flex flex-col w-full">
                  <h3 className="font-semibold text-sm text-gray-700">
                    ADDRESS
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="flex-grow relative">
                      <CharCountInput
                        name="street"
                        value={editedGroup.address.street}
                        onChange={(e) =>
                          onChange({
                            target: {
                              name: "address.street",
                              value: e.target.value,
                            },
                          })
                        }
                        placeholder="Street"
                        maxLength={100}
                      />
                    </div>
                    <div className="self-center -mt-3">
                      <TakeOverValues name={"address"} onChange={onChange} />
                    </div>
                  </div>

                  <CharCountInput
                    name="houseNumber"
                    value={editedGroup.address.houseNumber}
                    onChange={(e) =>
                      onChange({
                        target: {
                          name: "address.houseNumber",
                          value: e.target.value,
                        },
                      })
                    }
                    placeholder="House Number"
                    maxLength={10}
                  />
                  <CharCountInput
                    name="postalCode"
                    value={editedGroup.address.postalCode}
                    onChange={(e) =>
                      onChange({
                        target: {
                          name: "address.postalCode",
                          value: e.target.value,
                        },
                      })
                    }
                    placeholder="Postal Code"
                    maxLength={10}
                  />
                  <CharCountInput
                    name="city"
                    value={editedGroup.address.city}
                    onChange={(e) =>
                      onChange({
                        target: { name: "address.city", value: e.target.value },
                      })
                    }
                    placeholder="City"
                    maxLength={200}
                  />
                </div>
              </>
            ) : (
              <small className="text-gray-700 mt-4">
                {groupDetails.maxMembers - groupDetails.members.length} {""}{" "}
                open slots | {groupDetails.address.postalCode}{" "}
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
              <div className="mt-4">
                {/* Game master card and buttons*/}
                {!isEditing && groupDetails?.author && (
                  <PlayerCardSmall details={groupDetails.author} />
                )}
              </div>
            </div>

            {/* Action buttons */}

            {isAuthor ? (
              <div className="flex items-center justify-center w-full gap-4 mt-4">
                {isEditing ? null : (
                  <>
                    <button
                      className="btn-primary-dark"
                      onClick={openInviteModal}
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
                  onClick={openChat}
                  className="btn-primary-dark w-auto gap-2 flex mt-4"
                >
                  <img src={send_icon} alt="send icon" />
                  Send DM
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part1Left;
