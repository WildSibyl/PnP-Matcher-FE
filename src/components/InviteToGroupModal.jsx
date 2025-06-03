import React from "react";
import { Dialog } from "@headlessui/react";
import { useInviteModal } from "../context/InviteModalContextProvider";
import SelectUser from "./SelectUser";
import GroupSelect from "./edit-comp/GroupSelect";

const InviteToGroupModal = () => {
  const { isInviteModalOpen, activeGroupId, invitedUserId, closeInviteModal } =
    useInviteModal();

  return (
    <Dialog
      open={isInviteModalOpen}
      onClose={closeInviteModal}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal-Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-full max-w-md max-h-[80vh] rounded-2xl shadow-lg overflow-y-auto p-6 relative">
          <button
            onClick={closeInviteModal}
            className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>
          <Dialog.Title className="text-lg font-bold mb-4">
            Invite to group
          </Dialog.Title>

          <div className="flex flex-col justify-center text-center">
            <p>Select user</p>
            <SelectUser />
          </div>

          <div className="flex flex-col justify-center text-center">
            <p>Invite to:</p>
            <GroupSelect />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button className="btn-secondary-dark" onClick={closeInviteModal}>
              Cancel
            </button>
            <button className="btn-primary-light">Send Invite</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default InviteToGroupModal;
