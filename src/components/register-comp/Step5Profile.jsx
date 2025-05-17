const Step5Profile = ({ form, onChange }) => (
  <>
    <label className="label">Tagline</label>
    <textarea
      name="tagline"
      value={form.tagline}
      onChange={onChange}
      placeholder="Short tagline"
      className="input input-bordered h-12"
    />
    <label className="label">Description</label>
    <textarea
      name="description"
      value={form.description}
      onChange={onChange}
      placeholder="About you"
      className="input input-bordered h-24"
    />
  </>
);

export default Step5Profile;
