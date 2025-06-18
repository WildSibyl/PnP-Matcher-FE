import HomeMultiSelect from "../components/home-comp/HomeMultiSelect";
import CrossedColoredSwords from "../assets/crossedColoredSwords.svg";
import dragonImage from "../assets/dragonimage.png";
import AvatarGrid from "../components/home-comp/AvatarGrid";
import SystemList from "../components/home-comp/SystemList";
import renimg from "../assets/ren/Ren-explain2.png";
import tavern from "../assets/tavern.png";
import { useNavigate } from "react-router-dom";
import { useTagContext } from "../context/TagsContextProvider";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { homeSearch, setHomeSearch } = useTagContext();
  const [infoModalOpen, setInfoModalOpen] = useState(true);
  const [acceptedInfo, setAcceptedInfo] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("acceptTerms");
    if (hasAccepted === "true") {
      setInfoModalOpen(false);
    }
  }, []);

  const handleCloseModal = () => {
    setInfoModalOpen(false);
    localStorage.setItem("acceptTerms", "true");
  };

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
                className="w-full sm:h-auto object-cover  "
              />

              {/* Gradient overlays */}
              <div className="pointer-events-none absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-pnp-black to-transparent z-40" />
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-pnp-black to-transparent z-40" />
            </div>
            <div className="absolute top-5 z-10 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center mb-5">
                <h2 className="text-pnp-white normal-case font-semibold">
                  Find your party
                </h2>
                <h1 className="text-pnp-white normal-case font-semibold">
                  And start playing!
                </h1>
              </div>
              <p className="text-pnp-white text-lg mb-3">
                What are you looking for?
              </p>
              <div className="w-[300px]">
                <HomeMultiSelect
                  category="systems"
                  name="systems"
                  placeholder="Select up to 3 games!"
                  onChange={(values) =>
                    setHomeSearch((prev) => ({ ...prev, systems: values }))
                  }
                />
              </div>

              <button
                className="btn-primary-light m-0 -translate-y-1"
                onClick={() => navigate("/search")}
              >
                Find players
              </button>
            </div>
            <p className="text-pnp-white text-lg z-10">
              Find matching players near you
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
              Want to get into Pen&Paper Games?
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

          <p className="font-extrabold">
            We know that finding players and scheduling sessions can be the
            hardest part of playing roleplay games — that’s why we built
            PlotHook!
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

          <button
            className="btn-primary-dark"
            onClick={() => navigate("/search")}
          >
            Find players
          </button>
        </div>
      </div>
      {infoModalOpen && (
        <div
          className={`fixed bg-clip-padding  top-0 left-0 h-full flex text-center items-center w-full justify-center  z-[99] backdrop-blur-sm bg-[rgba(8,11,31,0.80)] ease-in-out duration-200
            opacity-100 visible `}
        >
          <div
            style={{ backgroundImage: `url(${tavern})` }}
            className="flex flex-col mx-2 overflow-hidden *:items-center lg:mx-auto max-w-[500px] lg:max-w-[50vw] xl:max-w-[40vw] my-auto rounded-2xl bg-center bg-cover border-pnp-white"
          >
            <img
              src={renimg}
              className="h-auto w-[18vh] min-w-[100px] mt-6  lg:w-[18vh] mx-auto"
              alt="Our mascot, Ren, celebrating"
            />
            <div className="flex flex-col relative px-8 -mt-10 items-center w-full bg-pnp-white p-2 rounded-b-2xl">
              <h2 className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-pnp-darkpurple to-pnp-darkblue my-4">
                HEADS UP!
              </h2>

              <p className="text-base font-normal">
                <b>
                  Plothook is a student project currently in development and
                  intended for invited users only:
                </b>{" "}
                Please avoid entering personal data, as we are still working
                toward full GDPR (DSGVO) compliance. The platform is hosted on
                Render.com and does not use analytics tools to track user data.
              </p>

              <p className="text-base font-normal border border-red-200 bg-red-100 rounded-2xl p-2 mt-4">
                Render's free tier goes to sleep after 15 minutes of inactivity,
                so you may experience a short delay in server response when
                loading the page for the first time. Please give it a minute,
                and it will be ready to use!
              </p>

              <form className="flex flex-col justify-center mt-4">
                <label className="flex gap-4">
                  <input
                    type="checkbox"
                    onChange={(e) => setAcceptedInfo(e.target.checked)}
                    className="cursor-pointer"
                  />
                  <p className="font-semibold">I understand and accept</p>
                </label>

                <button
                  onClick={() => handleCloseModal()}
                  disabled={!acceptedInfo}
                  className={`btn-primary-light my-5 ${
                    acceptedInfo ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  CONTINUE
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
