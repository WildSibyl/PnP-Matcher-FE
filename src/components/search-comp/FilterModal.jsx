import React from "react";
import { Dialog } from "@headlessui/react";
import TagMultiSelect from "../edit-comp/TagMultiSelect";
import WeekdaySelector from "../WeekdaySelector";

const FilterModal = ({
  isOpen,
  onClose,
  setFilter,
  filter,
  filterCount,
  setFilterCount,
  fetchUsers,
}) => {
  const mToKm = (value) => {
    const km = value / 1000;
    return km;
  };

  const kmToM = (value) => {
    const m = value * 1000;
    return m;
  };

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
            Set Filters
          </Dialog.Title>
          <div className="">
            {/* LOCATION */}
            <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <h3 className="collapse-title font-semibold">
                LOCATION
                {filter.radius > 5000 && (
                  <div className="pnp-badge-blue ml-2">Active</div>
                )}
              </h3>
              <div className="collapse-content text-sm">
                <label className="label">SEARCH RADIUS</label>
                <div className="flex justify-between gap-4 items-center">
                  <label className="label">
                    <span className="ml-2">{filter.radius / 1000} km</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    value={mToKm(filter.radius)}
                    onInput={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        radius: kmToM(Number(e.target.value)),
                      }))
                    }
                    className="range range-neutral"
                  />
                </div>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <h3 className="collapse-title font-semibold">
                AVAILABILITY
                {(filter.weekdays.length > 0 ||
                  (filter.frequencyPerMonth !== "" &&
                    filter.frequencyPerMonth > 0)) && (
                  <div className="pnp-badge-blue ml-2">Active</div>
                )}
              </h3>
              <div className="collapse-content text-sm">
                <div className="flex flex-col">
                  <WeekdaySelector
                    weekdays={filter.weekdays}
                    onChange={(newDays) =>
                      setFilter({ ...filter, weekdays: newDays })
                    }
                  />
                </div>
                <label className="label">FREQUENCY</label>
                <div className="label flex flex-row">
                  <input
                    type="number"
                    name="frequencyPerMonth"
                    min={0}
                    max={31}
                    value={filter.frequencyPerMonth}
                    onChange={(e) => {
                      {
                        const val = e.target.value;
                        setFilter((prev) => ({
                          ...prev,
                          frequencyPerMonth: val === "" ? "" : Number(val),
                        }));
                      }
                    }}
                    className="input-bordered ml-2"
                  />
                  <div className="label">TIMES</div>
                  <div className="text-pnp-black font-bold">per Month</div>
                </div>
                <small className="font-light">
                  (Set to 0 to ignore frequencyPerMonth filter.)
                </small>
              </div>
            </div>

            {/* PLAYER TYPE */}
            <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <h3 className="collapse-title font-semibold">
                PLAYER TYPE
                {(filter.age !== "" ||
                  filter.experience.length > 0 ||
                  filter.playingModes !== "" ||
                  filter.playstyles.length > 0) && (
                  <div className="pnp-badge-blue ml-2">Active</div>
                )}
              </h3>
              <div className="collapse-content text-sm">
                <div className="flex flex-col">
                  <label className="label">AGE</label>

                  <select
                    name="age"
                    className="input-bordered"
                    onChange={(e) =>
                      setFilter((prev) => ({ ...prev, age: e.target.value }))
                    }
                    value={filter.age}
                  >
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
                      setFilter((prev) => ({
                        ...prev,
                        experience: values.map((s) => s),
                      }))
                    }
                    value={filter.experience}
                  />

                  <label className="label">WHERE TO PLAY</label>
                  <select
                    name="playingModes"
                    className="input-bordered"
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        playingModes: e.target.value,
                      }))
                    }
                    value={filter.playingModes}
                  >
                    <option value="">Online & On-site</option>
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
                      setFilter((prev) => ({
                        ...prev,
                        playstyles: values.map((s) => s),
                      }))
                    }
                    value={filter.playstyles}
                  />
                </div>
              </div>
            </div>

            {/* GAME SYSTEMS */}
            <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <h3 className="collapse-title font-semibold">
                GAME SYSTEMS{" "}
                {filter.systems.length > 0 && (
                  <div className="pnp-badge-blue ml-2">Active</div>
                )}
              </h3>
              <div className="collapse-content text-sm">
                <div className="flex flex-col">
                  <TagMultiSelect
                    category="systems"
                    label="GAME SYSTEM"
                    helperText=""
                    name="systems"
                    placeholder="Filter game systems"
                    onChange={(values) =>
                      setFilter((prev) => ({
                        ...prev,
                        systems: values.map((s) => s),
                      }))
                    }
                    value={filter.systems}
                  />
                </div>
              </div>
            </div>

            {/* PREFERENCES */}
            <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <h3 className="collapse-title font-semibold">
                PREFERENCES{" "}
                {(filter.likes.length > 0 || filter.dislikes.length > 0) && (
                  <div className="pnp-badge-blue ml-2">Active</div>
                )}
              </h3>
              <div className="collapse-content text-sm">
                <div className="flex flex-col">
                  <TagMultiSelect
                    category="likes"
                    label="LIKES"
                    helperText=""
                    name="likes"
                    placeholder="Filter for LIKES"
                    onChange={(values) =>
                      setFilter((prev) => ({
                        ...prev,
                        likes: values.map((s) => s),
                      }))
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
                      setFilter((prev) => ({
                        ...prev,
                        dislikes: values.map((s) => s),
                      }))
                    }
                    value={filter.dislikes}
                  />
                </div>
              </div>
            </div>

            {/* LANGUAGES */}
            <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <h3 className="collapse-title font-semibold">
                LANGUAGES
                {filter.languages.length > 0 && (
                  <div className="pnp-badge-blue ml-2">Active</div>
                )}
              </h3>

              <div className="collapse-content text-sm">
                <div className="flex flex-col">
                  <TagMultiSelect
                    category="languages"
                    label="LANGUAGES"
                    helperText=""
                    name="languages"
                    placeholder="Filter for LANGUAGES"
                    onChange={(values) =>
                      setFilter((prev) => ({
                        ...prev,
                        languages: values.map((s) => s),
                      }))
                    }
                    value={filter.languages}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                className="btn-secondary-dark"
                onClick={() => {
                  setFilter({
                    radius: 5000,
                    weekdays: [],
                    frequencyPerMonth: "",
                    age: "",
                    experience: [],
                    playingModes: "",
                    playstyles: [],
                    systems: [],
                    likes: [],
                    dislikes: [],
                    languages: [],
                  });
                }}
              >
                Clear All Filters
              </button>
              <button
                className="btn-primary-light"
                onClick={() => {
                  onClose();
                }}
              >
                Apply {filterCount} Filter{filterCount > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FilterModal;
