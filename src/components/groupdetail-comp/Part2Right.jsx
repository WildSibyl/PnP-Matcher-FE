import TagMultiSelect from "../edit-comp/TagMultiSelect";
import like from "../../assets/like_icon.svg";
import dislike from "../../assets/dislike_icon.svg";
import PlayerCard from "../cards/PlayerCard";
import { useTagContext } from "../../context/TagsContextProvider";
import { useState } from "react";
import RollForGroup from "../group-comp/RollForGroup";
import TakeOverValues from "../group-comp/TakeOverValues";
import AiTextSuggest from "../group-comp/AiTextSuggest";
import CharCountInput from "../edit-comp/CharCountInput";

const Part2Right = ({
  isEditing,
  editedGroup,
  setEditedGroup,
  groupDetails,
  isAuthor,
  activeTab,
  setActiveTab,
  onChange,
}) => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const {
    systems: systemsOptions,
    languages: languagesOptions,
    playstyles: playstylesOptions,
    likes: likesOptions,
    dislikes: dislikesOptions,
  } = useTagContext();

  const MAX_LENGTH = 300;
  const toggleAboutText = () => setShowFullAbout((prev) => !prev);

  const displayedAbout =
    showFullAbout || editedGroup.description?.length <= MAX_LENGTH
      ? editedGroup.description
      : `${editedGroup.description.slice(0, MAX_LENGTH)}...`;

  return (
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
              <div className="flex gap-2 items-center">
                <div className="flex-grow relative">
                  <CharCountInput
                    name="description"
                    value={editedGroup.description}
                    onChange={onChange}
                    maxLength={500}
                  />
                </div>
                <div className="self-center -translate-y-4.5">
                  {" "}
                  <AiTextSuggest
                    onChange={onChange}
                    prompt="a nice description for your group"
                    name="description"
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 mt-4 whitespace-pre-wrap">
                {`${displayedAbout}` || "...to be filled in!"}
                {!isEditing && editedGroup.description?.length > MAX_LENGTH && (
                  <button
                    onClick={toggleAboutText}
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    {showFullAbout ? "Show less" : "Show more"}
                  </button>
                )}
              </p>
            )}

            <div className="mt-4">
              <h3 className="font-semibold text-sm text-gray-700">LANGUAGES</h3>
              {isEditing ? (
                <div className="flex gap-2 items-center">
                  <div className="flex-grow relative">
                    {" "}
                    <TagMultiSelect
                      category="languages"
                      name="languages"
                      placeholder="Select preferences"
                      value={editedGroup.languages}
                      onChange={(values) =>
                        setGroupForm({
                          ...editedGroup,
                          languages: values.map((l) => l),
                        })
                      }
                    />
                  </div>
                  <div className="self-start -translate-y-0.5">
                    <TakeOverValues onChange={onChange} name={"languages"} />
                  </div>
                </div>
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
                value={editedGroup.playstyles || []}
                onChange={(values) =>
                  setEditedGroup({
                    ...editedGroup,
                    playstyles: values.map((v) => v.id),
                  })
                }
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {editedGroup.playstyles?.length > 0 ? (
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

            <div className="mt-4">
              <h3 className="font-semibold text-sm text-gray-700">
                GAME SYSTEMS
              </h3>
              {isEditing ? (
                <div className="flex gap-2 items-center">
                  <div className="flex-grow relative">
                    <TagMultiSelect
                      category="systems"
                      name="systems"
                      placeholder="Select preferences"
                      onChange={(values) =>
                        setEditedGroup((prev) => ({
                          ...prev,
                          systems: values.map((s) => s),
                        }))
                      }
                      value={editedGroup.systems}
                    />
                  </div>
                  <div className="self-start -translate-y-0.5">
                    <TakeOverValues onChange={onChange} name={"systems"} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(editedGroup.systems || []).map((system) => {
                    const systemId =
                      typeof system === "string" ? system : system._id;
                    const systemOption = systemsOptions?.find(
                      (opt) => opt._id === systemId
                    );
                    return systemOption ? (
                      <div className="pnp-badge-black" key={systemId}>
                        {systemOption.label}
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {isEditing ? (
              <>
                <h3 className="font-semibold text-sm text-gray-700 mt-4 flex gap-2">
                  LIKES{" "}
                  <img
                    src={like}
                    alt="like"
                    className="w-5 h-5 -translate-y-1"
                  />
                </h3>
                <TagMultiSelect
                  category="likes"
                  value={editedGroup.likes || []}
                  onChange={(values) =>
                    setEditedGroup({
                      ...editedGroup,
                      likes: values.map((v) => v.id),
                    })
                  }
                />
              </>
            ) : (
              <>
                <h3 className="font-semibold text-sm text-gray-700 mt-4 flex gap-2">
                  LIKES <img src={like} alt="like" className="w-5 h-5" />
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editedGroup.likes?.length > 0 ? (
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
              </>
            )}

            <h3 className="font-semibold text-sm text-gray-700 mt-4 flex gap-2">
              DISLIKES <img src={dislike} alt="dislike" className="w-[17px]" />
            </h3>
            {isEditing ? (
              <TagMultiSelect
                category="dislikes"
                value={editedGroup.dislikes || []}
                onChange={(values) =>
                  setEditedGroup({
                    ...editedGroup,
                    dislikes: values.map((v) => v.id),
                  })
                }
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {editedGroup.dislikes?.length > 0 ? (
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
                  <div className="pnp-badge-white">None specified</div>
                )}
              </div>
            )}
          </>
        )}
        {activeTab === "members" && (
          <div className="pt-4 flex flex-col justify-center items-center">
            {groupDetails?.author && (
              <PlayerCard details={groupDetails?.author} />
            )}

            {groupDetails?.members?.map((e) => (
              <PlayerCard key={e._id} details={e} />
            ))}
            {isAuthor && groupDetails?.members?.length < 2 ? (
              <RollForGroup />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
export default Part2Right;
