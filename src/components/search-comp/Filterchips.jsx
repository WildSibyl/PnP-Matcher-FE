import getIcon from "../../utils/getIcon";
import removeFilter from "../../utils/removeFilter";
import shortenExperienceLabel from "../../utils/shortenExperience";
import { useRef } from "react";

const Filterchips = ({
  filter,
  setFilter,
  filterCount,
  setIsModalOpen,
  fetchUsers,
}) => {
  const handleRemove = (valToRemove, key) => {
    const newFilter = removeFilter(filter, valToRemove, key);
    setFilter(newFilter);
  };

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className={`relative w-full ${filterCount > 0 ? "md:pr-8" : ""}`}>
      {/* Scroll buttons only on desktop */}
      {filterCount > 0 && (
        <>
          <button
            onClick={scrollLeft}
            className="hidden md:block cursor-pointer hover:scale-95 hover:text-pnp-white *:ease-in-out duration-200 absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-pnp-blue shadow px-2 py-1 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={scrollRight}
            className="hidden  md:block cursor-pointer hover:scale-95 hover:text-pnp-white *:ease-in-out duration-200 absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-pnp-blue shadow px-2 py-1 rounded-full"
          >
            ▶
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className={`flex overflow-scroll items-center overflow-x-auto whitespace-nowrap no-scrollbar w-full px-4 ${
          filterCount === 0 ? "justify-center" : "pl-8"
        }`}
      >
        <div
          onClick={() => setIsModalOpen(true)}
          className="pnp-badge-white h-[2.2rem] cursor-pointer hover:scale-95 !hover:bg-pnp-blue *:ease-in-out duration-200"
        >
          {getIcon("Filter")}
          {filterCount > 0 ? "Filters" : "Filter: Search for games, radius..."}
          {filterCount > 0 ? `(${filterCount})` : ""}
        </div>
        {/* Radius Badge */}
        {filter.radius < 100000 ? (
          <div className="pnp-badge-white cursor-pointer shrink-0">
            Radius: {filter.radius / 1000}km
            <button
              className="*:w-[0.5rem]"
              onClick={() => {
                handleRemove("radius");
              }}
            >
              {getIcon("Close")}
            </button>
          </div>
        ) : (
          ""
        )}

        {/* Age Badge */}
        {filter.age !== "" && filter.age !== "All ages" ? (
          <div className="pnp-badge-white cursor-pointer shrink-0">
            Age: {filter.age}
            <button
              className="*:w-[0.5rem]"
              onClick={() => handleRemove("age")}
            >
              {getIcon("Close")}
            </button>
          </div>
        ) : (
          ""
        )}
        {/* playingModes badge */}
        {filter.playingModes !== "" &&
        filter.playingModes !== "Online & On-site" ? (
          <div className="pnp-badge-white cursor-pointer shrink-0">
            {filter.playingModes}
            <button
              className="*:w-[0.5rem]"
              onClick={() => handleRemove("playingModes")}
            >
              {getIcon("Close")}
            </button>
          </div>
        ) : (
          ""
        )}
        {/* Weekday Badge */}
        {filter.weekdays.length > 0 && (
          <div className="pnp-badge-white cursor-pointer shrink-0">
            Days:{` `}
            {filter.weekdays.map((e, index) => {
              if (index === filter.weekdays.length - 1) {
                return `${e}`;
              } else {
                return `${e}, `;
              }
            })}
            <button
              className="*:w-[0.5rem]"
              onClick={() => handleRemove("weekdays")}
            >
              {getIcon("Close")}
            </button>
          </div>
        )}
        {/* Frequency Badge */}
        {filter.frequencyPerMonth > 0 && (
          <div className="pnp-badge-white cursor-pointer shrink-0">
            Freq: {filter.frequencyPerMonth} /mo
            <button
              className="*:w-[0.5rem]"
              onClick={() => handleRemove(filter.frequencyPerMonth)}
            >
              {getIcon("Close")}
            </button>
          </div>
        )}
        {/* Language Badge */}
        {filter.languages.length > 0 && (
          <div className="pnp-badge-white cursor-pointer shrink-0">
            Languages:{` `}
            {filter.languages.map((e, index) => {
              if (index === filter.languages.length - 1) {
                return `${e.value}`;
              } else {
                return `${e.value}, `;
              }
            })}
            <button
              className="*:w-[0.5rem]"
              onClick={() => handleRemove("languages")}
            >
              {getIcon("Close")}
            </button>
          </div>
        )}
        {/* Game Systems Badges */}
        {filter.systems.length > 0
          ? filter.systems.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {e.value}
                  <button
                    className="*:w-[0.5rem]"
                    onClick={() => handleRemove(e, "systems")}
                  >
                    {getIcon("Close")}
                  </button>
                </div>
              );
            })
          : ""}
        {/* Experience Badges */}
        {filter.experience.length > 0
          ? filter.experience.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {shortenExperienceLabel(e.value)}
                  <button
                    className="*:w-[0.5rem]"
                    onClick={() => handleRemove(e, "experience")}
                  >
                    {getIcon("Close")}
                  </button>
                </div>
              );
            })
          : ""}
        {/* Playstyles Badges */}
        {filter.playstyles.length > 0
          ? filter.playstyles.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {e.value}
                  <button
                    className="*:w-[0.5rem]"
                    onClick={() => handleRemove(e, "playstyles")}
                  >
                    {getIcon("Close")}
                  </button>
                </div>
              );
            })
          : ""}
        {/* Likes Badges */}
        {filter.likes.length > 0
          ? filter.likes.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {e.value}
                  <button
                    className="*:w-[0.5rem]"
                    onClick={() => handleRemove(e, "likes")}
                  >
                    {getIcon("Close")}
                  </button>
                </div>
              );
            })
          : ""}
        {/* Disike Badges */}
        {filter.dislikes.length > 0
          ? filter.dislikes.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {e.value}
                  <button
                    className="*:w-[0.5rem]"
                    onClick={() => handleRemove(e, "dislikes")}
                  >
                    {getIcon("Close")}
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Filterchips;
