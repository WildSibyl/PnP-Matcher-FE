import profilePic from "../../assets/exampleProfilePic.jpg";
import CardAvailability from "./CardAvailability";

const PlayerCard = () => {
  return (
    <div className="bg-pnp-white pnp-shadow rounded-xl w-[95vw] px-4">
      {/* MATCHING VALUE */}
      <div>
        <p>85%</p>
      </div>
      {/* LFG, AVAILABILITY */}
      <div className="flex justify-between">
        <p>LFG</p>
        <CardAvailability />
      </div>
      {/* PLAYER INFOS */}
      <div className="flex gap-2">
        <img src={profilePic} className="rounded-full w-[22%]" alt="user"></img>
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
