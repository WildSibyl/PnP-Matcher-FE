import { useState, useEffect } from "react";

import getIcon from "../utils/getIcon";

const Search = () => {
  const [filter, setFilter] = useState({
    search: "",
    systems: ["DnD 5E", "Call of Cthullhu"],
    playstyles: ["Buttkicker", "Power Gamer"],
    experience: ["Adventurer"],
    likes: ["Dice"],
    dislikes: ["Homophobia", "Horror"],
    location: "Hamburg",
    radius: 10,
    weekdays: ["MO", "WE"],
    frequency: 1,
  });

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
      <div className="flex overflow-scroll">
        <div className="pnp-badge-white h-[2.2rem] ml-8 cursor-pointer hover:scale-95 !hover:bg-pnp-blue *:ease-in-out duration-200">
          {getIcon("Filter")}Filter
        </div>

        {/* Radius Badge */}
        {filter.radius > 5 ? (
          <div className="pnp-badge-white cursor-pointer h-[2.2rem]">
            {getIcon("Close")}Radius: {filter.radius}km
          </div>
        ) : (
          ""
        )}

        {/* Weekday Badge */}
        {filter.weekdays.length > 0 ? (
          <div className="pnp-badge-white cursor-pointer h-[2.2rem]">
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
                <div key={index} className="pnp-badge-white">
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
                <div key={index} className="pnp-badge-white">
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
                <div key={index} className="pnp-badge-white">
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
                <div key={index} className="pnp-badge-white">
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
                <div key={index} className="pnp-badge-white">
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
};

export default Search;
