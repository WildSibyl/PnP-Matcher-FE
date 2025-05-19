import { useState, useEffect } from "react";
import Select from "react-select";
import {
  experienceLevel,
  systemsPreference,
} from "../../data/dropdowns/preferences";
import TagMultiSelect from "../edit-comp/TagMultiSelect";
import { useTagContext } from "../../context/TagsContextProvider"; //still WIP

const Step3ExperienceAndSystem = ({ form, setForm, onChange }) => {
  const [selectedSystems, setSelectedSystems] = useState([]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      systems: selectedSystems.map((s) => s.value),
    }));
    console.log("Updated systems:", selectedSystems);
  }, [selectedSystems]);

  const handleSelectChange = (selectedOptions) => {
    const newSelections = selectedOptions || [];

    setSelectedSystems((prev) => {
      const unique = [...prev];
      newSelections.forEach((option) => {
        if (!unique.find((o) => o.value === option.value)) {
          unique.push(option);
        }
      });
      return unique;
    });
    console.log("Selected systems:", selectedOptions);
  };

  const handleRemoveSystem = (valToRemove) => {
    setSelectedSystems((prev) =>
      prev.filter((opt) => opt.value !== valToRemove)
    );
    console.log("Removed system:", valToRemove);
  };

  return (
    <>
      <h3 className="title">YOU AS A PLAYER</h3>
      <div className="flex flex-row justify-between">
        <label className="label">EXPERIENCE</label>
        <p className="label-italic">How many enemies did you slay?</p>
      </div>
      <select
        name="experience"
        value={form.experience}
        onChange={onChange}
        className="input-bordered"
      >
        <option value="">Select experience</option>
        {experienceLevel.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <div className="flex flex-row justify-between">
        <label className="label">GAME SYSTEM</label>
        <p className="label-italic">What are you looking for?</p>
      </div>
      <Select
        options={systemsPreference}
        isMulti
        onChange={handleSelectChange}
        value={[]} // Makes it always look empty
        placeholder="Select systems"
        className="input-bordered-multi"
      />
      <div className="tag-field">
        {selectedSystems.map((opt) => (
          <span
            key={opt.value}
            className="flex items-center bg-black text-white px-3 py-1 rounded-full"
          >
            {opt.label}
            <button
              className="ml-2 text-white"
              onClick={() => handleRemoveSystem(opt.value)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default Step3ExperienceAndSystem;
