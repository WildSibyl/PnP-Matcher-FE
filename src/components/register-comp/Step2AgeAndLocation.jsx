import RenBook from "../../assets/ren/Ren-book.png";
import CharCountInput from "../edit-comp/CharCountInput";

const Step2AgeAndLocation = ({ regForm, onChange }) => (
  <>
    <div>
      <div className="flex items-center justify-center mx-4">
        <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
          How many seasons have you seen pass, and where do you take your rest?
        </p>
        <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
      </div>
      <div className="flex flex-col gap-1 rounded-3xl bg-pnp-white p-6">
        <div className="flex flex-row justify-between">
          <label className="label">BIRTHDAY</label>
          <p className="label-italic">We will only display your age</p>
        </div>
        <input
          type="date"
          name="birthday"
          value={regForm.birthday}
          onChange={onChange}
          className="input-bordered"
          max={new Date().toISOString().split("T")[0]}
        />
        <CharCountInput
          name="street"
          value={regForm.address.street}
          onChange={(e) =>
            onChange({
              target: { name: "address.street", value: e.target.value },
            })
          }
          placeholder="Street"
          label="ADDRESS"
          helperText="Where is your castle placed?"
          maxLength={100}
        />
        <CharCountInput
          name="houseNumber"
          value={regForm.address.houseNumber}
          onChange={(e) =>
            onChange({
              target: { name: "address.houseNumber", value: e.target.value },
            })
          }
          placeholder="House Number"
          maxLength={10}
        />
        <CharCountInput
          name="postalCode"
          value={regForm.address.postalCode}
          onChange={(e) =>
            onChange({
              target: { name: "address.postalCode", value: e.target.value },
            })
          }
          placeholder="Postal Code"
          maxLength={10}
        />
        <CharCountInput
          name="city"
          value={regForm.address.city}
          onChange={(e) =>
            onChange({
              target: { name: "address.city", value: e.target.value },
            })
          }
          placeholder="City"
          maxLength={200}
        />
      </div>
    </div>
  </>
);

export default Step2AgeAndLocation;
