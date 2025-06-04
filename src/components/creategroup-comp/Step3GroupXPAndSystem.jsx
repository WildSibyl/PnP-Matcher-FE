import TagMultiSelect from "../edit-comp/TagMultiSelect";
import { useTagContext } from "../../context/TagsContextProvider";
import RenBook from "../../assets/ren/Ren-book.png";

const Step3GroupXPAndSystem = ({ groupForm, setGroupForm, onChange }) => {
  const { experienceLevel } = useTagContext();

  return (
    <>
      <div>
        <div className="flex items-center justify-center mx-4">
          <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
            How experienced do you expect your adventurers to be? And in what
            worlds do you want to embark on your quests?
          </p>
          <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
          {/* <h3 className="title">YOU AS A PLAYER</h3> */}
          <div className="flex flex-row justify-between">
            <label className="label">EXPERIENCE</label>
            <p className="label-italic">The experience level of your party</p>
          </div>
          <select
            name="experience"
            value={groupForm.experience}
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
            helperText="Where will you go?"
            name="systems"
            placeholder="Select preferences"
            onChange={(values) =>
              setGroupForm((prev) => ({
                ...prev,
                systems: values.map((s) => s),
              }))
            }
            value={groupForm.systems}
          />
        </div>
      </div>
    </>
  );
};

export default Step3GroupXPAndSystem;
