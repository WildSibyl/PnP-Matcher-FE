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
  </>
);

export default Step1UserInfo;
