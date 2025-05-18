const Step1UserInfo = ({ form, onChange }) => (
  <>
    <h3 className="title">WHO ARE YOU?</h3>
    <div className="flex flex-row justify-between">
      <label className="label">NAME</label>
      <p className="label-italic">How should we call you?</p>
    </div>
    <input
      name="userName"
      value={form.userName}
      onChange={onChange}
      placeholder="Username"
      className="input-bordered"
    />
    <div className="flex flex-row justify-between">
      <label className="label">E-MAIL</label>
      <p className="label-italic">Your inbox for magic letters</p>
    </div>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={onChange}
      placeholder="Email"
      className="input-bordered"
    />
    <div className="flex flex-row justify-between">
      <label className="label">PASSWORD</label>
      <p className="label-italic">Don't forget it!</p>
    </div>
    <input
      type="password"
      name="password"
      value={form.password}
      onChange={onChange}
      placeholder="Password"
      className="input-bordered"
    />
    <div className="flex flex-row justify-between">
      <label className="label">REPEAT PASSWORD</label>
      <p className="label-italic">Did you already forget it?!</p>
    </div>
    <input
      type="password"
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={onChange}
      placeholder="Confirm Password"
      className="input-bordered"
    />
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

export default Step1UserInfo;
