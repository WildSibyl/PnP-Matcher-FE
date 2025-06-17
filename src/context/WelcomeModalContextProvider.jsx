import { createContext, useContext, useEffect, useState } from "react";

export const WelcomeModalContext = createContext();

export const WelcomeModalContextProvider = ({ children }) => {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const openWelcomeModal = () => {
    // if (userId) setActiveUser(userId);
    //console.log("Welcome Modal opens!");
    setIsWelcomeModalOpen(true);
  };

  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
    // setActiveUser(null);
  };

  const values = {
    isWelcomeModalOpen,
    // activeUser,
    openWelcomeModal,
    closeWelcomeModal,
  };

  return (
    <WelcomeModalContext.Provider value={values}>
      {children}
    </WelcomeModalContext.Provider>
  );
};

export const useWelcomeModal = () => useContext(WelcomeModalContext);
