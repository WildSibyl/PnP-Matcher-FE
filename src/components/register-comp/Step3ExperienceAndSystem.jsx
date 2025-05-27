import TagMultiSelect from "../edit-comp/TagMultiSelect";
import { useTagContext } from "../../context/TagsContextProvider";
import RenBook from "../../assets/ren/Ren-book.png";

const Step3ExperienceAndSystem = ({ regForm, setRegForm, onChange }) => {
  const { experienceLevel } = useTagContext();

  return (
    <>
      <div>
        <div className="flex items-center justify-center mx-4">
          <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
            To cast my matchmaking magic I need to know a bit more about youre
            previous experience.
          </p>
          <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
          {/* <h3 className="title">YOU AS A PLAYER</h3> */}
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
              setRegForm((prev) => ({
                ...prev,
                systems: values.map((s) => s),
              }))
            }
            value={regForm.systems}
          />
        </div>
      </div>
    </>
  );
};

export default Step3ExperienceAndSystem;
