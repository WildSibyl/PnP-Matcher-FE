import PlayerAvatar from "./PlayerAvatar";
import { avatarUrls, famousSystems } from "../../data/mockHomeData"; // import your mock data
import avatarPic from "../../assets/avatar.svg"; // default avatar image
import check from "../../assets/checkmark.svg"; // check icon

const AvatarGrid = () => {
  // Pick the first 9 for display
  const avatars = avatarUrls.slice(0, 70);

  // Split into rows
  const row1 = avatars.slice(0, 20);
  const row2 = avatars.slice(20, 41);
  const row3 = avatars.slice(41, 61);

  const randomAvatar =
    avatars[Math.floor(Math.random() * avatars.length)] || avatarPic;

  return (
    <div className="relative w-full">
      <div className="z-20 absolute top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-2">
        <div className="h-[170px] w-[170px] rounded-full border-6 border-white overflow-hidden">
          <img
            src={randomAvatar}
            alt="random avatar"
            className="w-full h-full object-cover bg-gray-200"
          />
        </div>
        <div className="z-30 -translate-y-10 bg-pnp-white rounded-md">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pnp-darkpurple to-pnp-darkblue bg-clip-text text-transparent rounded-md px-4 py-1 shadow-md">
            95% MATCH!
          </h2>
        </div>
        <div className="bg-pnp-white rounded-lg px-3 py-1.5 justify-between top-0 right-0 -translate-y-13 flex flex-row w-[320px]">
          <div className="flex flex-row items-center">
            <img src={check} alt="check" className="mr-1.5" />
            <p className="text-sm">Playstyle</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={check} alt="check" className="mr-1.5" />
            <p className="text-sm">Preferences</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={check} alt="check" className="mr-1.5" />
            <p className="text-sm">Availability</p>
          </div>
        </div>
      </div>

      <div className="absolute z-10 inset-0 bg-pnp-black opacity-70" />

      <div className="avatar-grid space-y-2">
        <div className="flex justify-center space-x-2">
          {row1.map((avatar, index) => (
            <PlayerAvatar key={`row1-${index}`} avatar={avatar} />
          ))}
        </div>
        <div className="flex justify-center space-x-2">
          {row2.map((avatar, index) => (
            <PlayerAvatar key={`row2-${index}`} avatar={avatar} />
          ))}
        </div>
        <div className="flex justify-center space-x-2">
          {row3.map((avatar, index) => (
            <PlayerAvatar key={`row3-${index}`} avatar={avatar} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarGrid;
