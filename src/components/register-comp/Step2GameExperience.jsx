import Select from "react-select";
import {
  experienceLevel,
  systemsPreference,
} from "../../data/dropdowns/preferences";

const Step2GameExperience = ({ form, onChange, setMultiSelect }) => (
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
      value={systemsPreference.filter((s) => form.systems.includes(s.value))}
      onChange={(selected) => setMultiSelect("systems", selected)}
      placeholder="Select systems"
      className="input-bordered-multi"
    />
    <div className="tag-field">
      {form.systems.map((val) => (
        <span key={val} className="bg-black text-white px-2 py-1 rounded-full">
          {val}
        </span>
      ))}
    </div>
  </>
);

export default Step2GameExperience;
