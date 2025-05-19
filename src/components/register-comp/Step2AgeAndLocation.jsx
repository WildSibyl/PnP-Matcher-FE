const Step2AgeAndLocation = ({ form, onChange }) => (
  <>
    <div className="flex flex-row justify-between">
      <label className="label">BIRTHDAY</label>
      <p className="label-italic">We will only display your age</p>
    </div>
    <input
      type="date"
      name="birthday"
      value={form.birthday}
      onChange={onChange}
      className="input-bordered"
      max={new Date().toISOString().split("T")[0]}
    />
    <div className="flex flex-row justify-between">
      <label className="label">ZIP CODE</label>
      <p className="label-italic">Where is your castle placed?</p>
    </div>
    <input
      name="zipCode"
      value={form.zipCode}
      onChange={onChange}
      placeholder="Zip Code"
      className="input-bordered"
    />
    <div className="flex flex-row justify-between">
      <label className="label">COUNTRY</label>
      <p className="label-italic">How is your land called?</p>
    </div>
    <input
      name="country"
      value={form.country}
      onChange={onChange}
      placeholder="Country"
      className="input-bordered"
    />
  </>
);

export default Step2AgeAndLocation;
