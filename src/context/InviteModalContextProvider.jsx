import { createContext, useContext, useEffect, useState } from "react";

export const InviteModalContext = createContext();

export const InviteModalContextProvider = ({ children }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(false);
  const [activeUser, setActiveUser] = useState(false);

  const openInviteModal = ({ groupId, userId }) => {
    setActiveGroup(groupId);
    setActiveUser(userId);
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
    setActiveGroup(null);
    setActiveUser(null);
  };

  const values = {
    isInviteModalOpen,
    setIsInviteModalOpen,
    activeGroup,
    activeUser,
    openInviteModal,
    closeInviteModal,
  };

  return (
    <InviteModalContext.Provider value={values}>
      {children}
    </InviteModalContext.Provider>
  );
};

export const useInviteModal = () => {
  const context = useContext(InviteModalContext);
  if (!context) {
    throw new Error(
      "useInviteModal must be used within InviteModalContextProvider"
    );
  }
  return context;
};
