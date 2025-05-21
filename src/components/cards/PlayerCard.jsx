import { useState, useEffect } from "react";
import CardAvailability from "./CardAvailability";
import calculateAge from "../../utils/calculateAge";
import MatchingValue from "./MatchingValue";
import CardBadges from "./CardBadges";

import profilePic from "../../assets/exampleProfilePic.jpg";
import Usersvg from "../../assets/user.svg?react";
import getIcon from "../../utils/getIcon";

const PlayerCard = () => {
  const [currUser, setCurrUser] = useState(null);

  const playerOptions = [
    {
      value: "D&D 5e",
      category: "systems",
    },
    {
      value: "Call of Cthullhu",
      category: "systems",
    },
    {
      value: "Tactician",
      category: "playstyles",
    },
    {
      value: "Lorekeeper",
      category: "playstyles",
    },
    {
      value: "Narrator",
      category: "playstyles",
    },
    {
      value: "Combat",
      category: "likes",
    },
    {
      value: "Eating chips",
      category: "likes",
    },
    {
      value: "Puzzles",
      category: "likes",
    },
    {
      value: "Punching my GM",
      category: "likes",
    },
    {
      value: "Railroading",
      category: "dislikes",
    },
    {
      value: "Violence",
      category: "dislikes",
    },
  ];

  const matchValue = 85;
  const dummy = {
    _id: { $oid: "682ca76d0f10bd24e7301b6e" },
    userName: "WildSibyl",
    email: "giada.bellan.mail@gmail.com",
    password: "$2b$10$AZEbNytXLDSgw9UA1JV.8ObZVAcnHj0DnRKjNmiC5NkjHRuVMVAge",
    birthday: "2000-05-15T00:00:00.000+00:00",
    zipCode: "21149",
    country: "Germany",
    experience: "Adventurer: I know my game",
    systems: ["Pathfinder 2e", "Starfinder", "Shadowrun"],
    days: ["TU", "TH", "SA"],
    frequencyPerMonth: 1,
    languages: ["EN, DE"],
    playingRole: ["GM"],
    playstyles: ["Rules-Heavy", "Tactician"],
    likes: ["Railroading", "Narrative", "Bossfights"],
    dislikes: ["MinMaxing"],
    tagline: "Hi, This is me!",
    description: "",
    groups: [],
    createdAt: { $date: { $numberLong: "1747756909618" } },
    __v: { $numberInt: "0" },
  };

  useEffect(() => setCurrUser(dummy), []);

  if (!currUser) return <p>LOADING</p>;

  return (
    <div
      className="bg-pnp-white pnp-shadow rounded-xl w-[95vw] min-w-[350px] max-w-[500px] px-4
    mx-auto pb-6"
    >
      <MatchingValue matchValue={matchValue} />

      {/* LFG, AVAILABILITY */}
      <div className="flex justify-between  pt-4 mb-4">
        <div className="flex justify-center">
          <div className="pnp-badge-green">{getIcon("User")}LFG</div>
        </div>
        <CardAvailability
          days={currUser.days}
          frequencyPerMonth={currUser.frequencyPerMonth}
        />
      </div>

      {/* PLAYER INFOS */}
      <div className="flex gap-2 mb-4">
        <img
          src={profilePic}
          className="rounded-full w-[22%] border-2 border-pnp-white pnp-shadow"
          alt="user"
        ></img>
        <div>
          <h2 className="normal-case">{currUser.userName}</h2>
          <p className="font-semibold">{currUser.tagline}</p>
          <p className="font-medium text-[#3E5466]">{`${
            currUser.zipCode
          } | ${calculateAge(currUser.birthday)} years`}</p>
        </div>
      </div>

      {/* PLAYER OPTIONS */}
      <div className="flex flex-wrap pb-3 ">
        <div className="pnp-badge-green">{getIcon("Dice")} Player & GM</div>
        <div className="pnp-badge-purple">
          {getIcon("Experience")} Adventurer
        </div>

        <div className="pnp-badge-blue">{getIcon("On-site")} On-site</div>
      </div>
      <CardBadges options={playerOptions} className="mb-3" />
    </div>
  );
};

export default PlayerCard;
