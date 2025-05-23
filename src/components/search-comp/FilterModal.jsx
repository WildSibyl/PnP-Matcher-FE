import React from "react";
import { Dialog } from "@headlessui/react";

const FilterModal = ({ isOpen, onClose }) => (
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
          Set Filters
        </Dialog.Title>
        <div className="">
          <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <h3 className="collapse-title font-semibold">LOCATION</h3>
            <div className="collapse-content text-sm">
              <label className="label">SEARCH RADIUS</label>
              <div className="flex justify-between gap-4 items-center">
                <input
                  type="radius"
                  name="radius"
                  placeholder="5km"
                  className="input-bordered max-w-[20%]"
                />
                <input
                  type="range"
                  min={0}
                  max="100"
                  value="40"
                  className="range range-neutral"
                />
              </div>
              {/* <div className="flex flex-col">
                <label className="label">CITY</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />
              </div> */}
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <h3 className="collapse-title font-semibold">AVAILABILITY</h3>
            <div className="collapse-content text-sm">
              <div className="flex flex-col">
                <label className="label">WEEKDAYS</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />
                <label className="label">FREQUENCY</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <h3 className="collapse-title font-semibold">PLAYER TYPE</h3>
            <div className="collapse-content text-sm">
              <div className="flex flex-col">
                <label className="label">AGE</label>
                <select name="experience" className="input-bordered">
                  <option value="">All ages</option>
                  <option>Younger than 20</option>
                  <option>20 - 30</option>
                  <option>30 - 40</option>
                  <option>50 and older</option>
                </select>
                <label className="label">EXPERIENCE</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />
                <label className="label">WHERE TO PLAY</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />

                <label className="label">PLAYSTYLES</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <h3 className="collapse-title font-semibold">GAME SYSTEMS</h3>
            <div className="collapse-content text-sm">
              <div className="flex flex-col">
                <label className="label">GAME SYSTEMS</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <h3 className="collapse-title font-semibold">PREFERENCES</h3>
            <div className="collapse-content text-sm">
              <div className="flex flex-col">
                <label className="label">LIKES</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />
                <label className="label">DILIKES</label>
                <input
                  type="city"
                  name="city"
                  placeholder="e.g. Hamburg"
                  className="input-bordered"
                />
              </div>
            </div>
          </div>

          <button className="btn-primary-light">Apply X Filters</button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default FilterModal;
