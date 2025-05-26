import getIcon from "../../utils/getIcon";
import removeFilter from "../../utils/removeFilter";

const Filterchips = ({ filter, setFilter, filterCount, setIsModalOpen }) => {
  const handleRemove = (valToRemove) => {
    const newFilter = removeFilter(filter, valToRemove);
    setFilter(newFilter);
  };

  return (
    <div className="flex overflow-scroll items-center overflow-x-auto whitespace-nowrap no-scrollbar w-full px-4">
      <div
        onClick={() => setIsModalOpen(true)}
        className="pnp-badge-white h-[2.2rem] ml-8 cursor-pointer hover:scale-95 !hover:bg-pnp-blue *:ease-in-out duration-200"
      >
        {getIcon("Filter")}Filter{filterCount > 0 ? "s" : ""}
        {filterCount > 0 ? `(${filterCount})` : ""}
      </div>

      {/* Radius Badge */}
      {filter.radius > 5 ? (
        <div className="pnp-badge-white cursor-pointer shrink-0">
          Radius: {filter.radius}km
          <button
            className="*:w-[0.5rem]"
            onClick={() => handleRemove("radius")}
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
          <button className="*:w-[0.5rem]" onClick={() => handleRemove("age")}>
            {getIcon("Close")}
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Playmode badge */}
      {filter.playMode !== "" && filter.playMode !== "Online & On-site" ? (
        <div className="pnp-badge-white cursor-pointer shrink-0">
          {filter.playMode}
          <button
            className="*:w-[0.5rem]"
            onClick={() => handleRemove("playMode")}
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
          Days:
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
      {filter.frequency > 0 && (
        <div className="pnp-badge-white cursor-pointer shrink-0">
          Freq: {filter.frequency} /mo
          <button
            className="*:w-[0.5rem]"
            onClick={() => handleRemove(filter.frequency)}
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
                {e}
                <button
                  className="*:w-[0.5rem]"
                  onClick={() => handleRemove(e)}
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
                {e}
                <button
                  className="*:w-[0.5rem]"
                  onClick={() => handleRemove(e)}
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
                {e}
                <button
                  className="*:w-[0.5rem]"
                  onClick={() => handleRemove(e)}
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
                {e}
                <button
                  className="*:w-[0.5rem]"
                  onClick={() => handleRemove(e)}
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
                {e}
                <button
                  className="*:w-[0.5rem]"
                  onClick={() => handleRemove(e)}
                >
                  {getIcon("Close")}
                </button>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Filterchips;
