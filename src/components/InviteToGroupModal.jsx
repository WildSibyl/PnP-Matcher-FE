import React from "react";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

const InviteToGroupModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-full max-w-md max-h-[80vh] rounded-2xl shadow-lg overflow-y-auto p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>
          <Dialog.Title className="text-lg font-bold mb-4">
            Invite User to Group
          </Dialog.Title>
          hellO!
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default InviteToGroupModal;
