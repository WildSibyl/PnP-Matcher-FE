import { Dialog } from "@headlessui/react";
import { useWelcomeModal } from "../../context/WelcomeModalContextProvider";
import { useAuth } from "../../hooks/useAuth";
import renimg from "../../assets/ren/Ren-celebrate.png";
import tavern from "../../assets/tavern.png";
import Confetti from "./Confetti";
import { useState, useEffect } from "react";

const WelcomeModal = () => {
  const { closeWelcomeModal, isWelcomeModalOpen } = useWelcomeModal();
  const { user } = useAuth();
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    if (isWelcomeModalOpen) {
      // Make sure confetti will be mounted when modal is opened
      setConfettiKey((prev) => prev + 1);
    }
  }, [isWelcomeModalOpen]);
  return (
    <div
      className={`fixed bg-clip-padding top-0 left-0 h-full flex text-center items-center w-full justify-center  z-[99] backdrop-blur-sm bg-[rgba(8,11,31,0.80)] ease-in-out duration-200 ${
        isWelcomeModalOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      } `}
    >
      <div
        style={{ backgroundImage: `url(${tavern})` }}
        className="flex flex-col mx-2 overflow-hidden *:items-center lg:mx-auto lg:max-w-[50vw] xl:max-w-[40vw] my-auto rounded-2xl bg-center bg-cover border-pnp-white"
      >
        <img
          src={renimg}
          className="h-auto w-[40vw] lg:w-[25vw] mx-auto ren-bounce"
          alt="Our mascot, Ren, celebrating"
        />
        <div className="flex flex-col relative  -mt-10 items-center w-full bg-pnp-white p-2 rounded-b-2xl">
          <h2 className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-pnp-darkpurple to-pnp-darkblue">
            WELCOME, {user?.userName || "Adventurer!"}
          </h2>
          <p>
            Welcome to PlotHook! Now that you have registered there is so much
            stuff you can do! Find players, create a group, chat with your new
            friends... are you ready to start?
          </p>
          <button
            className="btn-primary-light mt-4"
            onClick={closeWelcomeModal}
          >
            LET'S GO
          </button>
        </div>

        {isWelcomeModalOpen && <Confetti key={confettiKey} />}
      </div>
    </div>
    // <Dialog
    //   open={isWelcomeModalOpen}
    //   onClose={closeWelcomeModal}
    //   className="relative z-[99]"
    // >
    //   <Dialog.Panel className="bg-pnp-white relative z-[90] w-full max-w-md max-h-[80vh] rounded-2xl shadow-lg overflow-y-auto p-6">
    //     <button
    //       onClick={closeWelcomeModal}
    //       className="absolute top-3 right-4 text-gray-600 hover:text-pnp-black text-xl"
    //     >
    //       ✕
    //     </button>
    //     <Dialog.Title className="text-lg font-bold mb-4">WELCOME!</Dialog.Title>
    //   </Dialog.Panel>
    // </Dialog>
  );
};

export default WelcomeModal;
