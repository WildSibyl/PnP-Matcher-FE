const Step2AgeAndLocation = ({ regForm, onChange }) => (
  <>
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
    <div className="flex flex-row justify-between">
      <label className="label">ADDRESS</label>
      <p className="label-italic">Where is your castle placed?</p>
    </div>
    <input
      name="street"
      value={regForm.address.street}
      onChange={(e) =>
        onChange({ target: { name: "address.street", value: e.target.value } })
      }
      placeholder="Street"
      className="input-bordered"
    />
    <input
      name="houseNumber"
      value={regForm.address.houseNumber}
      onChange={(e) =>
        onChange({
          target: { name: "address.houseNumber", value: e.target.value },
        })
      }
      placeholder="House Number"
      className="input-bordered"
    />
    <input
      name="postalCode"
      value={regForm.address.postalCode}
      onChange={(e) =>
        onChange({
          target: { name: "address.postalCode", value: e.target.value },
        })
      }
      placeholder="Postal Code"
      className="input-bordered"
    />
    <input
      name="city"
      value={regForm.address.city}
      onChange={(e) =>
        onChange({ target: { name: "address.city", value: e.target.value } })
      }
      placeholder="City"
      className="input-bordered"
    />
  </>
);

export default Step2AgeAndLocation;
