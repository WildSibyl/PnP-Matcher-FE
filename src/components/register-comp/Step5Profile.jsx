const Step5Profile = ({ form, onChange }) => (
  <>
    <div className="flex flex-row justify-between">
      <label className="label">TAGLINE</label>
      <p className="label-italic">Make your profile stand out!</p>
    </div>
    <textarea
      name="tagline"
      value={form.tagline}
      onChange={onChange}
      placeholder="Short tagline"
      className="input-bordered h-12"
    />
    <div className="flex flex-row justify-between">
      <label className="label">DESCRIPTION</label>
      <p className="label-italic">Tell us more about you</p>
    </div>
    <textarea
      name="description"
      value={form.description}
      onChange={onChange}
      placeholder="About you"
      className="input-bordered h-50"
    />
  </>
);

export default Step5Profile;
