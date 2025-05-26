import { useState, useEffect } from "react";
import CardAvailability from "./CardAvailability";
import MatchingValue from "./MatchingValue";
import CardBadges from "./CardBadges";

import getIcon from "../../utils/getIcon";
import groupdummy from "../../assets/groupdummy.png";

const GroupCard = () => {
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
    userName: "Brutal Buttkickers",
    email: "giada.bellan.mail@gmail.com",
    password: "$2b$10$AZEbNytXLDSgw9UA1JV.8ObZVAcnHj0DnRKjNmiC5NkjHRuVMVAge",
    birthday: "2000-05-15T00:00:00.000+00:00",
    zipCode: "21149",
    country: "Germany",
    experience: "Adventurer: I know my game",
    systems: ["Pathfinder 2e", "Starfinder", "Shadowrun"],
    days: ["TU", "TH", "SA", "SU"],
    frequencyPerMonth: 4,
    languages: ["EN, DE"],
    playingRole: ["GM"],
    playstyles: ["Rules-Heavy", "Tactician"],
    likes: ["Railroading", "Narrative", "Bossfights"],
    dislikes: ["MinMaxing"],
    tagline: "We are only looking for the best players!!1",
    description: "",
    groups: [],
    createdAt: { $date: { $numberLong: "1747756909618" } },
    __v: { $numberInt: "0" },
  };

  useEffect(() => setCurrUser(dummy), []);

  if (!currUser) return <p>LOADING</p>;

  return (
    <div
      className="bg-pnp-white pnp-shadow rounded-xl w-[95vw] min-w-[350px] max-w-[500px]
    mx-auto pb-6 mb-5"
    >
      <MatchingValue matchValue={matchValue} />

      {/* LFG, AVAILABILITY */}
      <div
        style={{ backgroundImage: `url(${groupdummy})` }}
        className=" pt-4 mb-4 rounded-t-lg bg-cover"
      >
        <div className="flex justify-between h-[18vh] px-3">
          <div className="pnp-badge-green">{getIcon("User")}LFG</div>
          <CardAvailability
            days={currUser.days}
            frequencyPerMonth={currUser.frequencyPerMonth}
          />
        </div>
      </div>

      {/* PLAYER INFOS */}

      <div className="px-4">
        <h2 className="normal-case">{currUser.userName}</h2>
        <p className="font-medium text-[#3E5466]">{`${currUser.zipCode}`}</p>
        <p className="font-normal pb-3">{currUser.tagline}</p>
      </div>

      {/* GROUP OPTIONS */}
      <div className="flex flex-wrap pb-3 px-3 ">
        <div className="pnp-badge-green">{getIcon("Dice")} Player & GM</div>
        <div className="pnp-badge-purple">
          {getIcon("Experience")} Adventurer
        </div>

        <div className="pnp-badge-blue">{getIcon("On-site")} On-site</div>
      </div>
      <div className="px-3">
        <CardBadges options={playerOptions} />
      </div>
    </div>
  );
};

export default GroupCard;
