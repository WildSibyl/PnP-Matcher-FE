import RenBook from "../../assets/ren/Ren-book.png";
import CharCountInput from "../edit-comp/CharCountInput";
import TakeOverValues from "../group-comp/TakeOverValues";

const Step2GroupLocation = ({ groupForm, onChange }) => (
  <>
    <div>
      <div className="flex items-center justify-center mx-4">
        <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
          Splendid! Next, let's talk logistics, so adventurers can find you
          easily!
        </p>
        <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
      </div>
      <div className="flex flex-col gap-1 rounded-3xl bg-pnp-white p-6">
        <div className="flex gap-2 items-center">
          <div className="flex-grow relative">
            <CharCountInput
              name="street"
              value={groupForm.address.street}
              onChange={(e) =>
                onChange({
                  target: { name: "address.street", value: e.target.value },
                })
              }
              placeholder="Street"
              label="ADDRESS"
              helperText="We will only show your postal code and city."
              maxLength={100}
            />
          </div>
          <div className="self-center -mt-3">
            <TakeOverValues name={"address"} onChange={onChange} />
          </div>
        </div>

        <CharCountInput
          name="houseNumber"
          value={groupForm.address.houseNumber}
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
          value={groupForm.address.postalCode}
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
          value={groupForm.address.city}
          onChange={(e) =>
            onChange({
              target: { name: "address.city", value: e.target.value },
            })
          }
          placeholder="City"
          maxLength={200}
        />
        <p className="flex items-center justify-center text-sm text-gray-400 font-normal">
          This allows players to search for groups in their area, making it
          easier to find local adventures. You will be able to also exclusively
          meet online!
        </p>
      </div>
    </div>
  </>
);

export default Step2GroupLocation;
