import TagMultiSelect from "../edit-comp/TagMultiSelect";
import { useTagContext } from "../../context/TagsContextProvider";
import RenExpl2 from "../../assets/ren/Ren-explain2.png";
import TakeOverValues from "../group-comp/TakeOverValues";

const Step3GroupXPAndSystem = ({ groupForm, setGroupForm, onChange }) => {
  const { groupExperience } = useTagContext();

  return (
    <>
      <div>
        <div className="flex items-center justify-center mx-4">
          <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
            How experienced do you expect your adventurers to be? And in what
            worlds do you want to embark on your quests?
          </p>
          <img src={RenExpl2} alt="Ren explaining" className="h-[150px]" />
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-pnp-white p-6">
          {/* <h3 className="title">YOU AS A PLAYER</h3> */}
          <div className="flex flex-row justify-between">
            <label className="label">EXPERIENCE</label>
            <p className="label-italic">The experience level of your party</p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-grow relative">
              <select
                name="experience"
                value={groupForm.experience}
                onChange={onChange}
                className="input-bordered-multi flex-grow !w-full px-2"
              >
                <option value="">Select experience</option>
                {groupExperience.map((level) => (
                  <option key={level._id} value={level._id}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="self-center -mt-3">
              <TakeOverValues onChange={onChange} name={"experience"} />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-grow relative">
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
            <div className="self-start mt-4">
              <TakeOverValues onChange={onChange} name={"systems"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3GroupXPAndSystem;
