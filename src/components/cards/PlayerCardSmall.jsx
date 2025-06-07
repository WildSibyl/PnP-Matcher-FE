import { useState, useEffect } from "react";
import CardAvailability from "./CardAvailability";
import calculateAge from "../../utils/calculateAge";
import MatchingValue from "./MatchingValue";
import CardBadges from "./CardBadges";
import shortenExperienceLabel from "../../utils/shortenExperience";
import { useNavigate } from "react-router-dom";
import getIcon from "../../utils/getIcon";
import { useAuth } from "../../hooks/useAuth";
import RenDie from "../../assets/ren/Ren-die.png";
import { useTeleport } from "../../context/TeleportContextProvider";

const PlayerCard = ({ details }) => {
  // const [currUser, setCurrUser] = useState(null);
  // useEffect(() => setCurrUser(dummy), []);
  const { user } = useAuth();
  const { startTeleport } = useTeleport();
  const navigate = useNavigate();

  if (!details) return <p>LOADING</p>;

  const handleClick = () => {
    if (user) {
      navigate(`/player/${details._id}`);
    } else {
      startTeleport("/login");
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer w-full">
      <div
        className="flex flex-row bg-pnp-white pnp-shadow items-center justify-center rounded-xl w-full h-[170px] max-w-[500px]
    mx-auto mt-6"
      >
        {/* PLAYER INFOS */}
        <div className="flex gap-2 p-4 text-left items-center justify-center">
          {details?.avatarUrl && (
            <img
              src={
                details?.avatarUrl?.trim() ||
                "https://i.ibb.co/F4MD88Lt/Ren-avatar.png"
              }
              onError={(e) => {
                e.target.src = "https://i.ibb.co/F4MD88Lt/Ren-avatar.png";
              }}
              className="rounded-full w-24 h-24 object-cover border-2 border-pnp-white pnp-shadow"
              alt="user"
            ></img>
          )}
          <div>
            <div className="flex flex-col">
              <div className="pnp-badge-green mb-2">
                {getIcon("Dice")} Game Master
              </div>

              <h2 className="normal-case text-pnp-black">{details.userName}</h2>
              <p className="font-semibold text-pnp-black">{details.tagline}</p>
              <p className="font-medium text-[#3E5466]">{`${
                details.address.postalCode
              } ${details.address.city} | ${calculateAge(
                details.birthday
              )} years old`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
