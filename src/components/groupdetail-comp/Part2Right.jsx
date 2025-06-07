import TagMultiSelect from "../edit-comp/TagMultiSelect";
import like from "../../assets/like_icon.svg";
import dislike from "../../assets/dislike_icon.svg";
import PlayerCard from "../cards/PlayerCard";
import { useTagContext } from "../../context/TagsContextProvider";
import { useState } from "react";
import RollForGroup from "../group-comp/RollForGroup";

const Part2Right = ({
  isEditing,
  editedGroup,
  setEditedGroup,
  groupDetails,
  isAuthor,
  activeTab,
  setActiveTab,
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
              <>
                <textarea
                  className="input w-full"
                  value={editedGroup.description || ""}
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
                {`${displayedAbout}` || "...to be filled in!"}
              </p>
            )}

            <div className="mt-4">
              <h3 className="font-semibold text-sm text-gray-700">LANGUAGES</h3>
              {isEditing ? (
                <TagMultiSelect
                  category="languages"
                  value={editedGroup.languages || []}
                  onChange={(values) =>
                    setEditedGroup({
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
                <TagMultiSelect
                  category="systems"
                  value={editedGroup.systems || []}
                  onChange={(values) =>
                    setEditedGroup({
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
                value={editedGroup.likes || []}
                onChange={(values) =>
                  setEditedGroup({
                    ...editedGroup,
                    likes: values.map((v) => v.id),
                  })
                }
              />
            ) : (
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
            )}

            <h3 className="font-semibold text-sm text-gray-700 mt-4 flex gap-2">
              DISLIKES <img src={dislike} alt="dislike" className="w-5 h-5" />
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
