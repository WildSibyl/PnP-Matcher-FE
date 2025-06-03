import { createContext, useContext, useEffect, useState } from "react";

export const GroupModalContext = createContext();

export const InviteModalContextProvider = ({ children }) => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [group, setGroup] = useState(false);

  const openGroupModal = ({ groupId, userId }) => {
    setActiveGroup(groupId);
    setActiveUser(userId);
    setIsInviteModalOpen(true);
  };

  const closeGroupModal = () => {
    setIsInviteModalOpen(false);
    setActiveGroup(null);
    setActiveUser(null);
  };

  const values = {
    isGroupModalOpen,
    setIsGroupModalOpen,
    activeGroup,
    setActiveGroup,
  };

  return (
    <GroupModalContext.Provider value={values}>
      {children}
    </GroupModalContext.Provider>
  );
};

export const useGroupModal = () => {
  const context = useContext(GroupModalContext);
  if (!context) {
    throw new Error("GroupModal must be used within GroupContextProvider");
  }
  return context;
};
