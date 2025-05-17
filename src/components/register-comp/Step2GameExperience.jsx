import Select from "react-select";
import {
  experienceLevel,
  systemsPreference,
} from "../../data/dropdowns/preferences";

const Step2GameExperience = ({ form, onChange, setMultiSelect }) => (
  <>
    <label className="label">Experience</label>
    <select
      name="experience"
      value={form.experience}
      onChange={onChange}
      className="select select-bordered"
    >
      <option value="">Select experience</option>
      {experienceLevel.map((level) => (
        <option key={level} value={level}>
          {level}
        </option>
      ))}
    </select>

    <label className="label mt-4">System</label>
    <Select
      options={systemsPreference}
      isMulti
      value={systemsPreference.filter((s) => form.systems.includes(s.value))}
      onChange={(selected) => setMultiSelect("systems", selected)}
      placeholder="Select systems"
    />
  </>
);

export default Step2GameExperience;
