import TagMultiSelect from "../components/edit-comp/TagMultiSelect";
import { useAuth } from "../hooks/useAuth";
import CrossedSwordssvg from "../assets/crossedSwords.svg?react";
import CrossedColoredSwords from "../assets/crossedColoredSwords.svg";
import dragonImage from "../assets/dragonimage.png";
import PlayerCard from "../components/cards/PlayerCard";
import GroupCard from "../components/cards/Groupcard";
import getIcon from "../utils/getIcon";
import AvatarGrid from "../components/home-comp/AvatarGrid";
import SystemList from "../components/home-comp/SystemList";

import Loader from "../components/Loader";
import { useState } from "react";

const Home = () => {
  const [guestUser, setGuestUser] = useState({
    systems: [],
    address: {
      city: "",
    },
  });

  return (
    <>
      {/* Homepage */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center bg-pnp-black gap-5 px-5">
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative h-[450px] w-full lg:w-screen flex items-center justify-center overflow-hidden -translate-y-15">
              <img
                src={dragonImage}
                alt="an image of a battle between heroes and dragons"
                className="w-full sm:h-auto object-cover"
              />

              {/* Gradient overlays */}
              <div className="pointer-events-none absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-pnp-black to-transparent z-40" />
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-pnp-black to-transparent z-40" />
            </div>
            <div className="absolute top-5 z-10 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center mb-5">
                <h2 className="text-pnp-white normal-case font-semibold">
                  Match players.
                </h2>
                <h1 className="text-pnp-white normal-case font-semibold">
                  Start playing!
                </h1>
              </div>
              <p className="text-pnp-white text-lg mb-3">
                What are you looking for?
              </p>
              <div className="w-[300px]">
                <input
                  className="input-bordered bg-white w-full mb-2"
                  name="city"
                  value={guestUser.address.city}
                  onChange={(e) =>
                    onChange({
                      target: { name: "address.city", value: e.target.value },
                    })
                  }
                  placeholder="Your city"
                />
                <TagMultiSelect
                  category="systems"
                  name="systems"
                  placeholder="Select your games!"
                  onChange={(values) =>
                    setGuestUser((prev) => ({ ...prev, systems: values }))
                  }
                />
              </div>

              <button className="btn-primary-light m-0 -translate-y-1">
                Find players
              </button>
            </div>
            <p className="text-pnp-white text-lg z-10">
              Match with players near you
            </p>
          </div>

          <div className="my-6">
            <AvatarGrid />
          </div>

          <p className="text-pnp-white">All your favorite TTRPG systems</p>
          <div className="mb-5">
            <SystemList />
          </div>

          <div className="flex flex-col items-center justify-center mb-5 w-full">
            <p className="text-pnp-white mb-5 px-5 text-center">
              Get to know PnPMatch!
            </p>

            <div className="w-[380px] sm:w-full max-w-screen-md px-5 mb-5">
              <div
                className="relative w-full overflow-hidden rounded-lg"
                style={{ paddingTop: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube-nocookie.com/embed/U_v3vTAEML0?si=EfJTcJhgVJfbBO_3"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center bg-pnp-white text-pnp-black gap-5 p-5">
          <div className="mt-5 mb-3">
            <img src={CrossedColoredSwords} alt="crossed colored swords" />
          </div>
          <h3 className="normal-case text-2xl font-semibold">
            Find a group that matches your playstyle!
          </h3>

          <p className="font-bold">
            We know that finding players and scheduling sessions can be the
            hardest part of playing roleplay games — that’s why we built
            PnPMatch!
          </p>

          <p className="font-semibold">
            Whether you're a seasoned Game Master, a curious first-timer, or
            somewhere in between, our tool helps you connect with others in your
            area (or online), based on your availability, playstyle, and
            favorite systems. No more endless forum threads or ghosted group
            chats — just real players, real games, and a community that shares
            your passion for storytelling, dice rolling, and epic adventures.
          </p>

          <p className="font-semibold">
            Create your group, find your next campaign, and let the adventure
            begin!
          </p>

          <button className="btn-primary-dark">Find players</button>
        </div>
      </div>
    </>
  );
};

export default Home;
