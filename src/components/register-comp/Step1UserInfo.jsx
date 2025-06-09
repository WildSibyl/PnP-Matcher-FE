import RenBook from "../../assets/ren/Ren-book.png";
import UsernameInput from "../edit-comp/UsernameInput";
import CharCountInput from "../edit-comp/CharCountInput";

const Step1UserInfo = ({ regForm, onChange }) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-center mx-4">
          <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
            Hey lonely wanderer! Let’s find you a group to go on adventures
            with! But first, who are you?
          </p>
          <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-pnp-white p-6">
          <UsernameInput
            name="userName"
            previousUsername={""}
            value={regForm.userName}
            onChange={onChange}
            maxLength={30}
            placeholder="Username"
            label="NAME"
            helperText="How should we call you?"
          />
          <CharCountInput
            name="email"
            type="email"
            value={regForm.email}
            onChange={onChange}
            maxLength={250}
            placeholder="Email"
            label="E-MAIL"
            helperText="Your inbox for magic letters"
          />

          <CharCountInput
            name="password"
            type="password"
            value={regForm.password}
            onChange={onChange}
            maxLength={250}
            placeholder="Password"
            label="PASSWORD"
            helperText="Don't forget it!"
          />

          <CharCountInput
            name="confirmPassword"
            type="password"
            value={regForm.confirmPassword}
            onChange={onChange}
            maxLength={250}
            placeholder="Confirm Password"
            label="REPEAT PASSWORD"
            helperText="Did you already forget it?!"
          />
        </div>
      </div>
    </>
  );
};

export default Step1UserInfo;
