import React from "react";
import { Dialog } from "@headlessui/react";
import TagMultiSelect from "../edit-comp/TagMultiSelect";

const FilterModal = ({
  isOpen,
  onClose,
  setFilter,
  filter,
  filterCount,
  setFilterCount,
}) => (
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
                <select name="age" className="input-bordered">
                  <option value="">All ages</option>
                  <option>Younger than 20</option>
                  <option>20 - 30</option>
                  <option>30 - 40</option>
                  <option>50 and older</option>
                </select>
                <TagMultiSelect
                  category="experience"
                  label="EXPERIENCE"
                  helperText=""
                  name="experience"
                  placeholder="Filter for EXPERIENCE"
                  onChange={(values) =>
                    setFilter((prev) => ({ ...prev, experience: values }))
                  }
                  value={filter.experience}
                />

                <label className="label">WHERE TO PLAY</label>
                <select name="playMode" className="input-bordered">
                  <option value="">Online & Offline</option>
                  <option>Online only</option>
                  <option>On-site only</option>
                </select>

                <TagMultiSelect
                  category="playstyles"
                  label="PLAYSTYLES"
                  helperText=""
                  name="playstyles"
                  placeholder="Filter for PLAYSTYLES"
                  onChange={(values) =>
                    setFilter((prev) => ({ ...prev, playstyles: values }))
                  }
                  value={filter.playstyles}
                />
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <h3 className="collapse-title font-semibold">GAME SYSTEMS</h3>
            <div className="collapse-content text-sm">
              <div className="flex flex-col">
                <TagMultiSelect
                  category="systems"
                  label="GAME SYSTEM"
                  helperText=""
                  name="systems"
                  placeholder="Filter game systems"
                  onChange={(values) =>
                    setFilter((prev) => ({ ...prev, systems: values }))
                  }
                  value={filter.systems}
                />
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <h3 className="collapse-title font-semibold">PREFERENCES</h3>
            <div className="collapse-content text-sm">
              <div className="flex flex-col">
                <TagMultiSelect
                  category="likes"
                  label="LIKES"
                  helperText=""
                  name="likes"
                  placeholder="Filter for LIKES"
                  onChange={(values) =>
                    setFilter((prev) => ({ ...prev, likes: values }))
                  }
                  value={filter.likes}
                />
                <TagMultiSelect
                  category="dislikes"
                  label="DISLIKES"
                  helperText=""
                  name="dislikes"
                  placeholder="Filter for DISLIKES"
                  onChange={(values) =>
                    setFilter((prev) => ({ ...prev, dislikes: values }))
                  }
                  value={filter.dislikes}
                />
              </div>
            </div>
          </div>

          <button className="btn-primary-light">
            Apply {filterCount} Filter{filterCount > 1 ? "s" : ""}
          </button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default FilterModal;
