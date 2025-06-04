import RenBook from "../../assets/ren/Ren-book.png";
import GroupnameInput from "../edit-comp/GroupnameInput";
import CharCountInput from "../edit-comp/CharCountInput";

const Step1GroupDetails = ({ groupForm, onChange }) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-center mx-4">
          <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
            Let’s make a group to go on adventures with!
          </p>
          <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
          <GroupnameInput
            name="name"
            value={groupForm.name}
            onChange={onChange}
            maxLength={30}
            placeholder="Your group name"
            label="NAME"
            helperText="How should your group be called?"
          />
        </div>
      </div>
    </>
  );
};

export default Step1GroupDetails;
