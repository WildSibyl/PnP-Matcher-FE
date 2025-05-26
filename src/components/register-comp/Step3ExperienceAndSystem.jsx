import TagMultiSelect from "../edit-comp/TagMultiSelect";
import { useTagContext } from "../../context/TagsContextProvider";

const Step3ExperienceAndSystem = ({ regForm, setRegForm, onChange }) => {
  const { experienceLevel } = useTagContext();

  return (
    <>
      <h3 className="title">YOU AS A PLAYER</h3>
      <div className="flex flex-row justify-between">
        <label className="label">EXPERIENCE</label>
        <p className="label-italic">How many enemies did you slay?</p>
      </div>
      <select
        name="experience"
        value={regForm.experience}
        onChange={onChange}
        className="input-bordered"
      >
        <option value="">Select experience</option>
        {experienceLevel.map((level) => (
          <option key={level._id} value={level._id}>
            {level.label}
          </option>
        ))}
      </select>
      <TagMultiSelect
        category="systems"
        label="GAME SYSTEM"
        helperText="What are you looking for?"
        name="systems"
        placeholder="Select preferences"
        onChange={(values) =>
          setRegForm((prev) => ({ ...prev, systems: values }))
        }
      />
    </>
  );
};

export default Step3ExperienceAndSystem;
