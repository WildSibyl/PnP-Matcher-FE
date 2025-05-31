import { useState, useEffect } from "react";
import CardAvailability from "./CardAvailability";
import calculateAge from "../../utils/calculateAge";
import MatchingValue from "./MatchingValue";
import CardBadges from "./CardBadges";
import shortenExperienceLabel from "../../utils/shortenExperience";
import { Link } from "react-router-dom";
import profilePic from "../../assets/exampleProfilePic.jpg";
import Usersvg from "../../assets/user.svg?react";
import getIcon from "../../utils/getIcon";

const PlayerCard = ({ details }) => {
  // const [currUser, setCurrUser] = useState(null);
  // useEffect(() => setCurrUser(dummy), []);

  if (!details) return <p>LOADING</p>;

  return (
    <Link to={`/player/${details._id}`}>
      <div
        className="bg-pnp-white pnp-shadow rounded-xl w-[95vw] min-w-[350px] max-w-[500px] px-4
    mx-auto pb-6 mb-5"
      >
        <MatchingValue matchScore={details.matchScore} />

        {/* LFG, AVAILABILITY */}
        <div className="flex justify-between  pt-4 mb-4">
          <div className="flex justify-center">
            <div className="pnp-badge-green">{getIcon("User")}LFG</div>
          </div>
          <CardAvailability
            weekdays={details.weekdays}
            frequencyPerMonth={details.frequencyPerMonth}
          />
        </div>

        {/* PLAYER INFOS */}
        <div className="flex gap-2 mb-4 text-left">
          <img
            src={details.avatarUrl}
            className="rounded-full w-24 h-24 object-cover border-2 border-pnp-white pnp-shadow"
            alt="user"
          ></img>
          <div>
            <h2 className="normal-case text-pnp-black">{details.userName}</h2>
            <p className="font-semibold text-pnp-black">{details.tagline}</p>
            <p className="font-medium text-[#3E5466]">{`${
              details.address.postalCode
            } ${details.address.city} | ${calculateAge(
              details.birthday
            )} years`}</p>
          </div>

          {/* PLAYER OPTIONS */}
          <div className="flex flex-wrap pb-3 ">
            {details.playerRole && (
              <div className="pnp-badge-green">
                {getIcon("Dice")} {details.playerRole}
              </div>
            )}

            {details.experience && (
              <div className="pnp-badge-purple">
                {getIcon("Experience")}{" "}
                {shortenExperienceLabel(details.experience?.value)}
              </div>
            )}

            {details.playingModes && (
              <div className="pnp-badge-blue">
                {getIcon(details.playingModes?.value)}{" "}
                {details.playingModes?.value}
              </div>
            )}
          </div>
          <CardBadges details={details} className="mb-3" />
        </div>

        {/* PLAYER OPTIONS */}
        <div className="flex flex-wrap pb-3 ">
          {details.playingRoles && (
            <div className="pnp-badge-green">
              {getIcon("Dice")} {details.playingRoles?.value}
            </div>
          )}

          {details.experience && (
            <div className="pnp-badge-purple">
              {getIcon("Experience")}{" "}
              {shortenExperienceLabel(details.experience?.value)}
            </div>
          )}

          {details.playingModes && (
            <div className="pnp-badge-blue">
              {getIcon(details.playingModes?.value)}{" "}
              {details.playingModes?.value === "Both" && getIcon("Online")}{" "}
              {details.playingModes?.value}
            </div>
          )}
        </div>
        <CardBadges details={details} className="mb-3" />
      </div>
    </Link>
  );
};

export default PlayerCard;
