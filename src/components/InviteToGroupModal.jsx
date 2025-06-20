import React from "react";
import { Dialog } from "@headlessui/react";
import { useInviteModal } from "../context/InviteModalContextProvider";
import SelectUser from "./edit-comp/SelectUser";
import GroupSelect from "./edit-comp/GroupSelect";
import { useState, useEffect } from "react";
import { sendInvite } from "../data/user";
import { toast } from "react-toastify";

const InviteToGroupModal = () => {
  const { isInviteModalOpen, closeInviteModal, activeGroup, activeUser } =
    useInviteModal();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    setSelectedUser(activeUser);
    setSelectedGroup(activeGroup);
  }, [activeGroup, activeUser]);

  const handleInvite = async () => {
    if (!selectedUser || !selectedGroup) {
      //console.log("User or group not selected.");
      return;
    }

    //console.log("Selected User", selectedUser);
    //console.log("Selected Group", selectedGroup);
    try {
      await sendInvite(selectedUser._id, selectedGroup);
      toast.success(`You've invited ${selectedUser.userName}!`);
      closeInviteModal();
    } catch (error) {
      //console.log("Error sending invite", error.message);
      toast.error(`${error.message}`);
    }
  };

  return (
    <Dialog
      open={isInviteModalOpen}
      onClose={closeInviteModal}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-pnp-black/30" aria-hidden="true" />

      {/* Modal-Panel */}
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-pnp-white relative z-[90] w-full max-w-md max-h-[80vh] rounded-2xl shadow-lg overflow-y-auto p-6 ">
          <button
            onClick={closeInviteModal}
            className="absolute top-3 right-4 text-gray-600 hover:text-pnp-black text-xl"
          >
            ✕
          </button>
          <Dialog.Title className="text-lg font-bold mb-4">
            Invite to group
          </Dialog.Title>

          <div className="flex flex-col justify-center text-center">
            <p>Select user</p>
            <SelectUser
              selected={selectedUser}
              setSelected={setSelectedUser}
              onChange={(user) => setSelectedUser(user)}
            />
          </div>

          <div className="flex flex-col justify-center text-center mt-4">
            <p>Invite to group:</p>
            <GroupSelect
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e)}
            />
          </div>

          <div className="mt-4 flex justify-center gap-2">
            <button className="btn-secondary-dark" onClick={closeInviteModal}>
              Cancel
            </button>
            <button
              onClick={() => handleInvite()}
              className="btn-primary-light"
            >
              Send Invite
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default InviteToGroupModal;
