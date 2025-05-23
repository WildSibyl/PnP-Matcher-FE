import { useState, useEffect } from "react";
import getIcon from "../utils/getIcon";
import { getUsers } from "../data/user";
import FilterModal from "../components/search-comp/FilterModal";

import PlayerCard from "../components/cards/PlayerCard";
import GroupCard from "../components/cards/Groupcard";
import Loader from "../components/Loader";
import countActiveFilters from "../utils/filterCount";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [filter, setFilter] = useState({
    search: "",
    systems: [],
    playstyles: [],
    experience: [],
    likes: [],
    dislikes: [],
    radius: 5,
    weekdays: [],
    playMode: "",
    frequency: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(5);
        setResults(data);
      } catch (error) {
        console.error("Error fetching users:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const currFilterCount = countActiveFilters(filter);
    setFilterCount(currFilterCount);
  }, [filter]);

  if (loading)
    return (
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-pnp-white">FIND PLAYERS</h2>
        {/* SEARCH BAR */}
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
        {/* SEARCH BAR END */}
        {/* FILTER CHIPS */}
        <div className="flex overflow-scroll items-center overflow-x-auto whitespace-nowrap no-scrollbar w-full px-4">
          <div className="pnp-badge-white h-[2.2rem] ml-8 cursor-pointer hover:scale-95 !hover:bg-pnp-blue *:ease-in-out duration-200">
            {getIcon("Filter")}Filter
          </div>

          {/* Radius Badge */}
          {filter.radius > 5 ? (
            <div className="pnp-badge-white cursor-pointer shrink-0">
              {getIcon("Close")}Radius: {filter.radius}km
            </div>
          ) : (
            ""
          )}

          {/* Weekday Badge */}
          {filter.weekdays.length > 0 ? (
            <div className="pnp-badge-white cursor-pointer shrink-0">
              {getIcon("Close")}Days:{" "}
              {filter.weekdays.map((e, index) => {
                if (index === filter.weekdays.length - 1) {
                  return `${e}`;
                } else {
                  return `${e}, `;
                }
              })}
            </div>
          ) : (
            ""
          )}

          {/* Game Systems Badges */}
          {filter.systems.length > 0
            ? filter.systems.map((e, index) => {
                return (
                  <div key={index} className="pnp-badge-white shrink-0">
                    {getIcon("Close")}
                    {e}
                  </div>
                );
              })
            : ""}

          {/* Experience Badges */}
          {filter.experience.length > 0
            ? filter.experience.map((e, index) => {
                return (
                  <div key={index} className="pnp-badge-white shrink-0">
                    {getIcon("Close")}
                    {e}
                  </div>
                );
              })
            : ""}

          {/* Playstyles Badges */}
          {filter.playstyles.length > 0
            ? filter.playstyles.map((e, index) => {
                return (
                  <div key={index} className="pnp-badge-white shrink-0">
                    {getIcon("Close")}
                    {e}
                  </div>
                );
              })
            : ""}

          {/* Likes Badges */}
          {filter.likes.length > 0
            ? filter.likes.map((e, index) => {
                return (
                  <div key={index} className="pnp-badge-white shrink-0">
                    {getIcon("Close")}
                    {e}
                  </div>
                );
              })
            : ""}

          {/* Disike Badges */}
          {filter.dislikes.length > 0
            ? filter.dislikes.map((e, index) => {
                return (
                  <div key={index} className="pnp-badge-white shrink-0">
                    {getIcon("Close")}
                    {e}
                  </div>
                );
              })
            : ""}
        </div>
        {/* FILTER CHIPS END */}
      </div>
    );

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <h2 className="text-pnp-white">FIND PLAYERS</h2>
      {/* SEARCH BAR */}
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" />
      </label>
      {/* SEARCH BAR END */}
      {/* FILTER CHIPS */}
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
            {getIcon("Close")}Radius: {filter.radius}km
          </div>
        ) : (
          ""
        )}

        {/* Weekday Badge */}
        {filter.weekdays.length > 0 ? (
          <div className="pnp-badge-white cursor-pointer shrink-0">
            {getIcon("Close")}Days:{" "}
            {filter.weekdays.map((e, index) => {
              if (index === filter.weekdays.length - 1) {
                return `${e}`;
              } else {
                return `${e}, `;
              }
            })}
          </div>
        ) : (
          ""
        )}

        {/* Game Systems Badges */}
        {filter.systems.length > 0
          ? filter.systems.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {getIcon("Close")}
                  {e}
                </div>
              );
            })
          : ""}

        {/* Experience Badges */}
        {filter.experience.length > 0
          ? filter.experience.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {getIcon("Close")}
                  {e}
                </div>
              );
            })
          : ""}

        {/* Playstyles Badges */}
        {filter.playstyles.length > 0
          ? filter.playstyles.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {getIcon("Close")}
                  {e}
                </div>
              );
            })
          : ""}

        {/* Likes Badges */}
        {filter.likes.length > 0
          ? filter.likes.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {getIcon("Close")}
                  {e}
                </div>
              );
            })
          : ""}

        {/* Disike Badges */}
        {filter.dislikes.length > 0
          ? filter.dislikes.map((e, index) => {
              return (
                <div key={index} className="pnp-badge-white shrink-0">
                  {getIcon("Close")}
                  {e}
                </div>
              );
            })
          : ""}
      </div>
      {/* FILTER CHIPS END */}
      {/* TAB */}
      {/* TAB END */}
      {/* RESULTS */}
      <div className="mt-2 flex flex-col items-center">
        <div className="my-8 text-pnp-white font-normal text-center ">
          {results.length > 0 ? (
            <h3>{results.length} results</h3>
          ) : (
            <>
              <h3>No users found!</h3> <p>Please change your filters.</p>
            </>
          )}
        </div>
        <div>
          {results.map((e) => {
            return <PlayerCard key={e._id} details={e} />;
          })}
        </div>
      </div>
      {console.log(filter)};{/* Filter selection modal */}
      {console.log(filterCount)};
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setFilter={setFilter}
        filter={filter}
        filterCount={filterCount}
        setFilterCount={setFilterCount}
      />
    </div>
  );
};

export default Search;
