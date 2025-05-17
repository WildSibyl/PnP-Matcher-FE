const Step1UserInfo = ({ form, onChange }) => (
  <>
    <label className="label">Username</label>
    <input
      name="userName"
      value={form.userName}
      onChange={onChange}
      placeholder="Username"
      className="input input-bordered"
    />
    <label className="label">E-mail</label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={onChange}
      placeholder="Email"
      className="input input-bordered"
    />
    <label className="label">Password</label>
    <input
      type="password"
      name="password"
      value={form.password}
      onChange={onChange}
      placeholder="Password"
      className="input input-bordered"
    />
    <label className="label">Repeat password</label>
    <input
      type="password"
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={onChange}
      placeholder="Confirm Password"
      className="input input-bordered"
    />
    <label className="label">Birthday</label>
    <input
      type="date"
      name="birthday"
      value={form.birthday}
      onChange={onChange}
      className="input input-bordered"
      max={new Date().toISOString().split("T")[0]}
    />
    <label className="label">Zip code</label>
    <input
      name="zipCode"
      value={form.zipCode}
      onChange={onChange}
      placeholder="Zip Code"
      className="input input-bordered"
    />
    <label className="label">Country</label>
    <input
      name="country"
      value={form.country}
      onChange={onChange}
      placeholder="Country"
      className="input input-bordered"
    />
  </>
);

export default Step1UserInfo;
