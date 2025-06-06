import GroupCard from "../components/cards/Groupcard";
import getIcon from "../utils/getIcon";
import AvatarGrid from "../components/home-comp/AvatarGrid";
import SystemList from "../components/home-comp/SystemList";
import TagMultiSelect from "../components/edit-comp/TagMultiSelect";
import CrossedSwordssvg from "../assets/crossedSwords.svg?react";
import PlayerCard from "../components/cards/PlayerCard";
import RollForGroup from "../components/group-comp/RollForGroup";
import Confetti from "../components/register-comp/Confetti";
import RenNotif from "../assets/ren/Ren-notif-succ.png";
import AiTextSuggest from "../components/group-comp/AiTextSuggest";

import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { useInviteModal } from "../context/InviteModalContextProvider";
import InviteToGroupModal from "../components/InviteToGroupModal";
import { toast } from "react-toastify";

const Test = () => {
  const [guestUser, setGuestUser] = useState({
    systems: [],
    address: {
      city: "",
    },
  });
  const { openInviteModal } = useInviteModal();

  const testgroup = {
    _id: "683d9ed5e83520e34b7a43dc",
    author: "68388d38527cb89d6f71f3ce",
  };

  const toastifyTest = () => {
    toast("This is a test notification!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const toastSuccess = () => {
    toast.success("Success!");
    // toast.success(
    //   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    //     <img src={RenNotif} alt="Success" style={{ width: "50px" }} />
    //     <span>Operation completed successfully!</span>
    //   </div>
    // );
  };
  const toastError = () => {
    toast.error("Error!");
  };
  const toastWarning = () => {
    toast.warning("Warning!");
  };
  const toastInfo = () => {
    toast.info("Info");
  };
  const toastGeneric = () => {
    toast("Toast");
  };

  const toastSuccessD = () => {
    toast.success("Success!", { theme: "colored" });
  };
  const toastErrorD = () => {
    toast.error("Error!", { theme: "colored" });
  };
  const toastWarningD = () => {
    toast.warning("Warning!", { theme: "colored" });
  };
  const toastInfoD = () => {
    toast.info("Info", { theme: "colored" });
  };
  const toastGenericD = () => {
    toast("Toast", { theme: "dark" });
  };

  return (
    <>
      <div className="bg-gray-600">
        {/* testing the new TagMultiSelect component */}
        <TagMultiSelect
          category="likes"
          label="Test"
          helperText="This is a test"
          name="likes"
          placeholder="Select preferences"
          onChange={(values) => setUser((prev) => ({ ...prev, likes: values }))}
        />
        <Confetti />
        <RollForGroup />

        <AiTextSuggest />

        {/* Toastify testing */}

        <div className="flex flex-col items-center justify-center">
          <h3>Toastify testing</h3>
          <div className="flex items-center justify-center">
            <button
              className="btn-primary-light"
              onClick={() => {
                toastifyTest();
              }}
            >
              Test
            </button>
            <button
              className="btn-primary-light"
              onClick={() => {
                toastSuccess();
              }}
            >
              Success
            </button>
            <button
              className="btn-primary-light"
              onClick={() => {
                toastError();
              }}
            >
              Error
            </button>
            <button
              className="btn-primary-light"
              onClick={() => {
                toastWarning();
              }}
            >
              Warning
            </button>
            <button
              className="btn-primary-light"
              onClick={() => {
                toastInfo();
              }}
            >
              Info
            </button>
            <button
              className="btn-primary-light"
              onClick={() => {
                toastGeneric();
              }}
            >
              Generic
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="btn-primary-dark"
              onClick={() => {
                toastifyTest();
              }}
            >
              Test
            </button>
            <button
              className="btn-primary-dark"
              onClick={() => {
                toastSuccessD();
              }}
            >
              Success
            </button>
            <button
              className="btn-primary-dark"
              onClick={() => {
                toastErrorD();
              }}
            >
              Error
            </button>
            <button
              className="btn-primary-dark"
              onClick={() => {
                toastWarningD();
              }}
            >
              Warning
            </button>
            <button
              className="btn-primary-dark"
              onClick={() => {
                toastInfoD();
              }}
            >
              Info
            </button>
            <button
              className="btn-primary-dark"
              onClick={() => {
                toastGenericD();
              }}
            >
              Generic
            </button>
          </div>
        </div>

        {/* End of toastify testing */}

        <h1 className="text-pnp-white">This is the H1</h1>
        <h2 className="text-pnp-white">This is the H2</h2>
        <h3 className="text-pnp-white">This is the H3</h3>
        <p className="text-pnp-white">This is an paragraph text</p>
        <small className="text-pnp-white">Those are smaller footnotes</small>
        <div className="w-[3vw] h-[3vh] bg-pnp-black"></div>
        <div className="w-[3vw] h-[3vh] bg-pnp-green"></div>
        <div className="w-[3vw] h-[3vh] bg-pnp-purple"></div>
        <div className="w-[3vw] h-[3vh] bg-pnp-blue"></div>
        <div className="w-[3vw] h-[3vh] bg-pnp-white"></div>
        <br />
        <button className="btn-primary-light">Primary LIGHT</button>
        <button className="btn-primary-light btn-icon">
          <CrossedSwordssvg className="text-pnp-white" />
          Match now!
        </button>
        <button className="btn-secondary-light">Secondary LIGHT</button>
        <button className="btn-primary-dark">Primary DARK</button>
        <button className="btn-secondary-dark">Secondary DARK</button>
        <div className="pnp-badge-black my-5">
          {getIcon("Lorekeeper")} Lorekeeper
        </div>

        {/* INVITE MODAL */}
        <button
          className="btn-primary-light"
          onClick={() => openInviteModal({})}
        >
          Open Invite
        </button>
      </div>

      {/* LOADING ANIMATION */}
      <Loader />

      {/* CARDS */}

      <div>
        <h1 className="text-pnp-white">
          A very long text to test navbar & scroll
        </h1>
        <p className="text-pnp-white">
          Asterix (French: Astérix or Astérix le Gaulois [asteʁiks lə ɡolwa],
          "Asterix the Gaul"; also known as Asterix and Obelix in some
          adaptations or The Adventures of Asterix) is a French comic album
          series about a Gaulish village which, thanks to a magic potion that
          enhances strength, resists the forces of Julius Caesar's Roman
          Republic Army in a nonhistorical telling of the time after the Gallic
          Wars. Many adventures take the titular hero Asterix and his friend
          Obelix to Rome and beyond. The series first appeared in the
          Franco-Belgian comic magazine Pilote on 29 October 1959. It was
          written by René Goscinny and illustrated by Albert Uderzo until
          Goscinny's death in 1977. Uderzo then took over the writing until
          2009, when he sold the rights to publishing company Hachette; he died
          in 2020. In 2013, a new team consisting of Jean-Yves Ferri (script)
          and Didier Conrad (artwork) took over. As of 2023, 40 volumes have
          been released; the most recent was penned by new writer Fabcaro and
          released on 26 October 2023. By that year, the volumes in total had
          sold 393 million copies,[1] making them the best-selling European
          comic book series, and the second best-selling comic book series in
          history after One Piece.
        </p>
      </div>
      <InviteToGroupModal />
    </>
  );
};

export default Test;
