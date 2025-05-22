import React from "react";
import { Dialog } from "@headlessui/react";

const TermsModal = ({ isOpen, onClose }) => (
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
          Terms and Conditions
        </Dialog.Title>
        <div className="space-y-3 text-sm">
          <p>
            These are the terms and conditions. You agree to be a legend, show
            up, be kind, and enjoy the ride.
          </p>
          <p>
            You also acknowledge that adventures may cause occasional mud,
            sunburn, and unforgettable memories.
          </p>
          <p>Scroll for more epicness...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Vivamus lacinia odio vitae vestibulum vestibulum.</p>
          <p>Cras venenatis euismod malesuada. And more...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Vivamus lacinia odio vitae vestibulum vestibulum.</p>
          <p>Cras venenatis euismod malesuada. And more...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Vivamus lacinia odio vitae vestibulum vestibulum.</p>
          <p>Cras venenatis euismod malesuada. And more...</p>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default TermsModal;
