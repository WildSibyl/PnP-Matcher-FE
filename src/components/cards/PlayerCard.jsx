import { useState, useEffect } from "react";
import CardAvailability from "./CardAvailability";
import calculateAge from "../../utils/calculateAge";
import MatchingValue from "./MatchingValue";
import CardBadges from "./CardBadges";

import profilePic from "../../assets/exampleProfilePic.jpg";
import Usersvg from "../../assets/user.svg?react";
import getIcon from "../../utils/getIcon";

const PlayerCard = ({ details }) => {
  // const [currUser, setCurrUser] = useState(null);
  // console.log("User ", details);
  const matchValue = 85;

  // useEffect(() => setCurrUser(dummy), []);

  if (!details) return <p>LOADING</p>;

  return (
    <div
      className="bg-pnp-white pnp-shadow rounded-xl w-[95vw] min-w-[350px] max-w-[500px] px-4
    mx-auto pb-6 mb-5"
    >
      <MatchingValue matchValue={matchValue} />

      {/* LFG, AVAILABILITY */}
      <div className="flex justify-between  pt-4 mb-4">
        <div className="flex justify-center">
          <div className="pnp-badge-green">{getIcon("User")}LFG</div>
        </div>
        <CardAvailability
          days={details.days}
          frequencyPerMonth={details.frequencyPerMonth}
        />
      </div>

      {/* PLAYER INFOS */}
      <div className="flex gap-2 mb-4">
        <img
          src={profilePic}
          className="rounded-full w-24 h-24 object-cover border-2 border-pnp-white pnp-shadow"
          alt="user"
        ></img>
        <div>
          <h2 className="normal-case">{details.userName}</h2>
          <p className="font-semibold">{details.tagline}</p>
          <p className="font-medium text-[#3E5466]">{`${
            details.address.postalCode
          } ${details.address.city} | ${calculateAge(
            details.birthday
          )} years`}</p>
        </div>
      </div>

      {/* PLAYER OPTIONS */}
      <div className="flex flex-wrap pb-3 ">
        <div className="pnp-badge-green">
          {getIcon("Dice")} {details.playerRole}
        </div>
        <div className="pnp-badge-purple">
          {getIcon("Experience")} {details.playerRole}
        </div>

        <div className="pnp-badge-blue">{getIcon("On-site")} On-site</div>
      </div>
      <CardBadges details={details} className="mb-3" />
    </div>
  );
};

export default PlayerCard;
