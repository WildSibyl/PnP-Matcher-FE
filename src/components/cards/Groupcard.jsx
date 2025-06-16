import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardAvailability from "./CardAvailability";
import MatchingValue from "./MatchingValue";
import CardBadges from "./CardBadges";
import { useTeleport } from "../../context/TeleportContextProvider";
import { useAuth } from "../../hooks/useAuth";
import getIcon from "../../utils/getIcon";
import shortenExperienceLabel from "../../utils/shortenExperience";

const GroupCard = ({ details }) => {
  const [currGroup, setCurrGroup] = useState(null);
  const { user } = useAuth();
  const { startTeleport } = useTeleport();
  const navigate = useNavigate();

  //console.log("Group Details", details);

  useEffect(() => setCurrGroup(details), []);

  if (!currGroup) return <p>LOADING</p>;

  const handleClick = () => {
    if (user) {
      navigate(`/group/${details._id}`);
    } else {
      startTeleport("/login");
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div
        className="bg-pnp-white pnp-shadow rounded-xl w-[95vw] min-w-[350px] max-w-[500px]
    mx-auto pb-6 mb-5"
      >
        <MatchingValue matchScore={currGroup.matchScore} />

        {/* LFG, AVAILABILITY */}
        <div
          style={{ backgroundImage: `url(${details.image})` }}
          className=" pt-4 mb-4 rounded-t-lg bg-cover"
        >
          <div className="flex justify-between h-[18vh] px-3">
            <div
              className={`${
                currGroup.members.length >= currGroup.maxMembers
                  ? "pnp-badge-white"
                  : "pnp-badge-green"
              }`}
            >
              {getIcon("User")} {currGroup.members.length + 1} /{" "}
              {currGroup.maxMembers + 1} {/* +1 for the author */}
            </div>
            <CardAvailability
              weekdays={currGroup.weekdays}
              frequencyPerMonth={currGroup.frequencyPerMonth}
            />
          </div>
        </div>

        {/* PLAYER INFOS */}

        <div className="px-4">
          <h2 className="normal-case">{currGroup.name}</h2>
          <p className="font-medium text-[#3E5466]">{`${currGroup.address.postalCode} - ${currGroup.address.city}`}</p>
          <p className="font-normal pb-3">{currGroup.tagline}</p>
        </div>

        {/* GROUP OPTIONS */}
        <div className="flex flex-wrap pb-3 px-3 ">
          <div className="pnp-badge-purple">
            {getIcon("Experience")}{" "}
            {shortenExperienceLabel(currGroup.experience.value)}
          </div>

          <div className="pnp-badge-blue">{getIcon("On-site")} On-site</div>
        </div>
        <div className="px-3">
          <CardBadges details={details} />
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
