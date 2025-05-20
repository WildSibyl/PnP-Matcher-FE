import CardAvailability from "./CardAvailability";

import profilePic from "../../assets/exampleProfilePic.jpg";
import Starsvg from "../../assets/star.svg?react";
import Usersvg from "../../assets/user.svg?react";

const PlayerCard = () => {
  const matchValue = 85;

  return (
    <div className="bg-pnp-white pnp-shadow rounded-xl w-[95vw] px-4">
      {/* MATCHING VALUE */}
      {matchValue > 77 ? (
        <div className="flex justify-center -translate-y-3">
          <div className="flex items-center gap-2 font-extrabold text-pnp-white rounded-full bg-linear-165 box-border from-pnp-darkpurple to-pnp-darkblue px-3 py-1">
            <Starsvg className="text-pnp-white max-w-[1rem]" /> <p>85%</p>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* LFG, AVAILABILITY */}
      <div className="flex justify-between mb-4">
        <div className="flex justify-center">
          <div className="flex items-center gap-2 font-extrabold text-pnp-black rounded-full bg-pnp-green px-3 py-1">
            <Usersvg className="text-pnp-black max-w-[1rem]" /> <p>LFG</p>
          </div>
        </div>
        <CardAvailability />
      </div>
      {/* PLAYER INFOS */}
      <div className="flex gap-2 mb-4">
        <img
          src={profilePic}
          className="rounded-full w-[22%] border-2 border-pnp-white pnp-shadow"
          alt="user"
        ></img>
        <div>
          <h2 className="normal-case">Username</h2>
          <p className="font-semibold">This is my tagline!</p>
          <div className="flex gap-2">
            <p className="font-medium text-[#3E5466]">21073 Hamburg</p>{" "}
            <p className="font-medium text-[#3E5466]">|</p>{" "}
            <p className="font-medium text-[#3E5466]">35 years</p>
          </div>
        </div>
      </div>
      {/* PLAYER OPTIONS */}
      <div className="flex flex-wrap">
        <p>Player</p>
        <p>GM</p>
        <p>Adventurer</p>
      </div>
      <div className="flex flex-wrap">
        <p>DnD 5E</p>
      </div>
    </div>
  );
};

export default PlayerCard;
