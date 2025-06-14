import RenBook from "../../assets/ren/Ren-book.png";
import Select from "react-select";
import GroupnameInput from "../edit-comp/GroupnameInput";
import CharCountInput from "../edit-comp/CharCountInput";
import AiTextSuggest from "../group-comp/AiTextSuggest";

const Step1GroupDetails = ({ groupForm, onChange }) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-center mx-4">
          <div className="bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
            <p className="label-italic text-pnp-white">
              Let’s summon a group to go on adventures with.
            </p>
            <p className="label-italic text-pnp-white">
              Use the magic hats to help you come up with ideas!
            </p>
          </div>
          <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-pnp-white p-6">
          <div className="flex gap-2 items-center">
            <div className="flex-grow relative">
              <GroupnameInput
                name="name"
                value={groupForm.name}
                onChange={onChange}
                maxLength={50}
                placeholder="Your group name"
                label="NAME"
                helperText="How should your group be called?"
              />
            </div>
            <div className="self-center -mt-3">
              <AiTextSuggest
                onChange={onChange}
                prompt="very short pen&paper group name"
                name="name"
                length={50}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex-grow relative">
              <CharCountInput
                name="tagline"
                value={groupForm.tagline}
                onChange={onChange}
                maxLength={150}
                placeholder="A short tagline for your group"
                label="TAGLINE"
                helperText="A catchy phrase to get noticed!"
              />
            </div>
            <div className="self-center -mt-3">
              {" "}
              <AiTextSuggest
                onChange={onChange}
                prompt="very short cool tagline"
                name="tagline"
                length={150}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <label className="label">MAX MEMBERS</label>
            <p className="label-italic">How many can join the party?</p>
          </div>
          <input
            type="number"
            name="maxMembers"
            className="input-bordered mb-0"
            value={groupForm.maxMembers}
            onChange={onChange}
            max={30}
            min={1}
            placeholder="Your ideal party number, excluding you"
          />
          {groupForm.maxMembers < 1 || groupForm.maxMembers > 30 ? (
            <p className="text-red-500 text-sm mt-1">
              Party members must be between 1 and 30.
            </p>
          ) : (
            <p className="text-gray-400 font-normal text-sm mt-1">
              Your ideal party size, excluding you. We recommend 4.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Step1GroupDetails;
