import renimg from "../../assets/ren/Ren-chat.png";
import { useState, useEffect } from "react";

const ProfileChecker = ({ user }) => {
  const [perc, setPerc] = useState(null);

  useEffect(() => {
    const checkProfile = () => {
      const toCheck = [
        "playingModes",
        "playingRoles",
        "languages",
        "description",
        "playstyles",
        "systems",
        "likes",
        "dislikes",
        "tagline",
        "avatarUrl",
      ];

      let value = 0;
      toCheck.map((e) => {
        if (Array.isArray(user[e]) && user[e].length > 0) {
          //   console.log(`${e} arr adds 1`);
          value++;
        }
        if (
          e === "avatarURL" &&
          user[e] !== "https://i.ibb.co/F4MD88Lt/Ren-avatar.png"
        ) {
          //   console.log(`${e} arr adds 1`);
          value++;
        } else if (typeof user[e] === "string" && user[e] !== "") {
          //   console.log(`${e} txt adds 1`);
          value++;
        }
      });

      console.log(`${value} points of ${toCheck.length}`);
      const percentage = Math.round((toCheck.length / 100) * value * 100);
      console.log(percentage);
      setPerc(percentage);
    };

    checkProfile();
  }, [user]);

  if (!perc) return;

  if (perc >= 100) return;

  return (
    <div className="flex flex-col mx-auto w-[100%] max-w-[500px] bg-linear-165 from-pnp-darkpurple to-pnp-darkblue rounded-2xl mb-4">
      <div className="flex">
        <div>
          <h2 className="text-pnp-white pt-4 px-4 md:text-2xl">
            Profile is{" "}
            <span className="font-extrabold text-[#FCFC3B]"> {perc}% </span>{" "}
            completed
          </h2>
          <div className="pt-2 px-4">
            {" "}
            <div className="w-full h-[1rem] rounded-full bg-pnp-darkpurple">
              <div
                style={{ width: `${perc}%` }}
                className="h-[1rem] rounded-full bg-pnp-darkblue pt-4 px-4"
              ></div>
            </div>
          </div>

          <div className="flex flex-col pl-4 py-4">
            <p className="text-pnp-white pb-2 text-[0.9rem]">
              Make sure to fill in more information so we can match you with
              players.
            </p>
          </div>
        </div>

        <div className="flex justify-end overflow-hidden h-auto min-w-[150px] w-[50%] relative">
          <img
            src={renimg}
            alt="Ren, our mascot"
            className="absolute mx-auto w-auto max-h-[100%] bottom-0 translate-y-2"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ProfileChecker;
