import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../data/auth";
import { useAuth } from "../hooks/useAuth";
import RenBook from "../assets/ren/Ren-book.png";

const Login = () => {
  const [{ email, password }, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error("All fields are required");
      setLoading(true);
      const data = await signIn({ email, password });
      setUser(data.user);
      navigate("/");
      toast.success(`Welcome, ${data.user.userName}!`);
      //console.log(email, password);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <form
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mx-4">
          <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
            Hello Adventurer! Do you have the magic words to enter the realm?
          </p>
          <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-pnp-white px-6 pt-3 pb-4 w-full">
          {/* <h3 className="title">HELLO ADVENTURER!</h3> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 translate-x-3.5 translate-y-8.25"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <label className="input-bordered px-0.5 flex items-center mb-0 focus-within:border-pnp-purple focus-within:ring-1 focus-within:ring-pnp-purple">
            <input
              name="email"
              value={email}
              onChange={handleChange}
              type="email"
              className="grow focus:outline-none  pl-9 h-full w-full"
              placeholder="Email"
            />
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 translate-x-3.5 translate-y-8.25"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <label className="input-bordered px-0.5 flex items-center focus-within:border-pnp-purple focus-within:ring-1 focus-within:ring-pnp-purple">
            <input
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              className="grow rounded-[1.5px] focus:outline-none pl-9 h-full w-full"
              placeholder="Password"
            />
          </label>
        </div>
        <button
          className="btn-primary-light self-center mt-4"
          disabled={loading}
        >
          Login
        </button>
        <small className="text-pnp-white hover:underline justify-center flex mt-2">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-pnp-purple hover:underline ml-2">
            Register!
          </Link>
        </small>
      </div>
    </form>
  );
};

export default Login;
