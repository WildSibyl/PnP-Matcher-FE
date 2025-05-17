import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../data/auth"; // Assuming you have a signup function in utils/auth
import { useAuth } from "../hooks/useAuth"; // Assuming you have an AuthContextProvider

const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    about: "",
    zipCode: "",
    country: "",
    system: "",
    playstyle: "",
    days: [],
    frequencyPerMonth: 1,
    likes: "",
    dislikes: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "days") {
      let newDays = [...form.days];
      if (checked) {
        if (!newDays.includes(value)) newDays.push(value);
      } else {
        newDays = newDays.filter((day) => day !== value);
      }
      setForm((prev) => ({ ...prev, days: newDays }));
    } else if (type === "number") {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic frontend validation
      if (
        !form.userName ||
        !form.email ||
        !form.password ||
        !form.confirmPassword ||
        !form.birthday ||
        !form.about ||
        !form.zipCode ||
        !form.country ||
        !form.system ||
        !form.playstyle ||
        form.days.length === 0 ||
        !form.frequencyPerMonth
      ) {
        throw new Error("Please fill out all required fields.");
      }
      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match.");
      }
      setLoading(true);

      // Convert likes and dislikes from comma-separated string to arrays
      const likesArray = form.likes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const dislikesArray = form.dislikes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // Prepare data for backend
      const payload = {
        userName: form.userName,
        email: form.email,
        password: form.password,
        birthday: new Date(form.birthday),
        about: form.about,
        zipCode: form.zipCode,
        country: form.country,
        system: form.system,
        playstyle: form.playstyle,
        days: form.days,
        frequencyPerMonth: form.frequencyPerMonth,
        likes: likesArray,
        dislikes: dislikesArray,
        groups: [], // optional, empty for now
      };

      await signUp(payload);
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3"
    >
      <input
        name="userName"
        value={form.userName}
        onChange={handleChange}
        placeholder="Username"
        className="input input-bordered"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="input input-bordered"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="input input-bordered"
      />
      <input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="input input-bordered"
      />
      <input
        type="date"
        name="birthday"
        value={form.birthday}
        onChange={handleChange}
        className="input input-bordered"
        max={new Date().toISOString().split("T")[0]}
      />
      <textarea
        name="about"
        value={form.about}
        onChange={handleChange}
        placeholder="About"
        className="input input-bordered"
      />
      <input
        name="zipCode"
        value={form.zipCode}
        onChange={handleChange}
        placeholder="Zip Code"
        className="input input-bordered"
      />
      <input
        name="country"
        value={form.country}
        onChange={handleChange}
        placeholder="Country"
        className="input input-bordered"
      />
      <input
        name="system"
        value={form.system}
        onChange={handleChange}
        placeholder="System"
        className="input input-bordered"
      />
      <input
        name="playstyle"
        value={form.playstyle}
        onChange={handleChange}
        placeholder="Playstyle"
        className="input input-bordered"
      />

      <fieldset className="flex gap-2 flex-wrap">
        <legend>Days you play:</legend>
        {daysOfWeek.map((day) => (
          <label key={day} className="flex items-center gap-1">
            <input
              type="checkbox"
              name="days"
              value={day}
              checked={form.days.includes(day)}
              onChange={handleChange}
            />
            {day.toUpperCase()}
          </label>
        ))}
      </fieldset>

      <label>
        Frequency per month:
        <input
          type="number"
          name="frequencyPerMonth"
          min={1}
          max={31}
          value={form.frequencyPerMonth}
          onChange={handleChange}
          className="input input-bordered"
        />
      </label>

      <input
        name="likes"
        value={form.likes}
        onChange={handleChange}
        placeholder="Likes (comma separated)"
        className="input input-bordered"
      />
      <input
        name="dislikes"
        value={form.dislikes}
        onChange={handleChange}
        placeholder="Dislikes (comma separated)"
        className="input input-bordered"
      />

      <small>
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Log in!
        </Link>
      </small>

      <button disabled={loading} className="btn btn-primary self-center">
        Create Account
      </button>
    </form>
  );
};

export default Register;
