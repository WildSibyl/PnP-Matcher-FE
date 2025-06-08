import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RenDie from "../assets/ren/Ren-die.png"; // Adjust the path as necessary

const TeleportContext = createContext();

export const TeleportContextProvider = ({ children }) => {
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Called on clicking "Log In"
  const startTeleport = (path) => {
    setShowModal(true);
    setIsTeleporting(false);
    setNextRoute(path);
  };

  // When user clicks "Log In" button in modal, start teleport + navigate
  const handleConfirm = () => {
    setIsTeleporting(true);

    // Show teleporting message for 2 seconds, then navigate
    setTimeout(() => {
      navigate(nextRoute || "/");
    }, 500);
  };

  // Close modal 0.5s after navigation completes (location changes)
  useEffect(() => {
    if (isTeleporting && showModal && location.pathname === nextRoute) {
      const timeoutId = setTimeout(() => {
        setShowModal(false);
        setIsTeleporting(false);
        setNextRoute(null);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, isTeleporting, showModal, nextRoute]);

  const handleCancel = (e) => {
    e?.stopPropagation();
    setShowModal(false);
    setIsTeleporting(false);
    setNextRoute(null);
  };

  return (
    <TeleportContext.Provider value={{ startTeleport }}>
      {children}
      {showModal && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-pnp-black/70 z-50">
          <div className="flex flex-col items-center justify-center mx-4 md:max-w-[400px] rounded-3xl bg-pnp-black">
            <div className="flex items-center justify-center rounded-3xl bg-pnp-black p-6 pb-0">
              <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
                Hi traveler! Only those that know the magic words can explore
                the realm.
              </p>
              <img
                src={RenDie}
                alt="Ren holding a book"
                className="h-[150px]"
              />
            </div>
            <div className="flex flex-col items-center justify-between md:justify-center gap-1 rounded-3xl bg-pnp-white p-6 w-full">
              {isTeleporting ? (
                <p className="italic text-pnp-black">✨ Teleporting... ✨</p>
              ) : (
                <>
                  <p className="mb-4">
                    Please log in to continue your adventure!
                  </p>
                  <ul className="list-none space-y-2 mb-4">
                    {[
                      "See player details",
                      "Contact and chat with others",
                      "Join groups or create your own",
                    ].map((text, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="w-4 h-4 text-pnp-darkpurple mr-2 flex-shrink-0"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon
                            points="6,0 12,6 6,12 0,6"
                            fill="currentColor"
                          />
                        </svg>
                        {text}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-6 space-x-2 ">
                    <button
                      className="btn-secondary-dark"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-primary-light px-5"
                      onClick={handleConfirm}
                    >
                      Log In
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </TeleportContext.Provider>
  );
};

export const useTeleport = () => useContext(TeleportContext);
