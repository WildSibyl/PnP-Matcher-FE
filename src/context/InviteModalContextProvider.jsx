import { createContext, useContext, useEffect, useState } from "react";

export const InviteModalContext = createContext();

export const InviteModalContextProvider = ({ children }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const openInviteModal = ({ groupId = null, userId = null }) => {
    if (groupId) setActiveGroup(groupId);
    if (userId) setActiveUser(userId);
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
    setActiveGroup(null);
    setActiveUser(null);
  };

  const values = {
    isInviteModalOpen,
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

export const useInviteModal = () => useContext(InviteModalContext);
