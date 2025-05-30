import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../data/auth";
//import { useAuth } from "../hooks/useAuth";
import UsernameInput from "../components/edit-comp/UsernameInput";
import CharCountInput from "../components/edit-comp/CharCountInput";
import TagMultiSelect from "../components/edit-comp/TagMultiSelect";
import { useTagContext } from "../context/TagsContextProvider";
import TermsModal from "../components/register-comp/TermsModal";

const AdminDashboard = () => {
  const [adminForm, setAdminForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    address: {
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
    },
    experience: "",
    systems: [],
    weekdays: [],
    frequencyPerMonth: 1,
    terms: false,
    avatarUrl: "",
    playingRoles: null,
    playingModes: null,
    languages: [],
    playstyles: [],
    likes: [],
    dislikes: [],
    tagline: "",
    description: "",
  });

  const { experienceLevel, playingRoles, playingModes } = useTagContext();
  const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setAdminForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
      return;
    }

    if (name === "weekdays") {
      let newDays = [...adminForm.weekdays];
      if (checked) {
        if (!newDays.includes(value)) newDays.push(value);
      } else {
        newDays = newDays.filter((day) => day !== value);
      }
      setAdminForm((prev) => ({ ...prev, weekdays: newDays }));
    } else if (type === "checkbox") {
      setAdminForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setAdminForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setAdminForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayInputChange = (name, value) => {
    setAdminForm((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  // Helpers for react-select multi-select updates
  const setMultiSelect = (name, selectedOptions) => {
    setRegForm((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((s) => s.value) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (adminForm.password !== adminForm.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userName: adminForm.userName,
        email: adminForm.email,
        password: adminForm.password,
        confirmPassword: adminForm.confirmPassword,
        birthday: new Date(adminForm.birthday).toISOString(),
        address: {
          ...adminForm.address,
        },
        experience: adminForm.experience,
        systems: adminForm.systems.map((s) => s.id || s),
        weekdays: adminForm.weekdays,
        frequencyPerMonth: adminForm.frequencyPerMonth,
        terms: adminForm.terms,
        avatarUrl: adminForm.avatarUrl,
        playingRoles: adminForm.playingRoles,
        playingModes: adminForm.playingModes,
        languages: adminForm.languages.map((s) => s.id || s),
        playstyles: adminForm.playstyles.map((s) => s.id || s),
        likes: adminForm.likes.map((s) => s.id || s),
        dislikes: adminForm.dislikes.map((s) => s.id || s),
        tagline: adminForm.tagline,
        description: adminForm.description,
        groups: [],
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

  //if (player) return <p className="text-pnp-white">404 not found</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin User Registration</h1>

      {/* BASIC INFO */}
      <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
        <UsernameInput
          name="userName"
          value={adminForm.userName}
          onChange={handleChange}
          maxLength={30}
          placeholder="Username"
          label="NAME"
          helperText="How should we call you?"
        />
        <CharCountInput
          name="email"
          type="email"
          value={adminForm.email}
          onChange={handleChange}
          maxLength={250}
          placeholder="Email"
          label="E-MAIL"
          helperText="Your inbox for magic letters"
        />

        <CharCountInput
          name="password"
          type="password"
          value={adminForm.password}
          onChange={handleChange}
          maxLength={250}
          placeholder="Password"
          label="PASSWORD"
          helperText="Don't forget it!"
        />

        <CharCountInput
          name="confirmPassword"
          type="password"
          value={adminForm.confirmPassword}
          onChange={handleChange}
          maxLength={250}
          placeholder="Confirm Password"
          label="REPEAT PASSWORD"
          helperText="Did you already forget it?!"
        />
      </div>
      <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
        <div className="flex flex-row justify-between">
          <label className="label">BIRTHDAY</label>
          <p className="label-italic">We will only display your age</p>
        </div>
        <input
          type="date"
          name="birthday"
          value={adminForm.birthday}
          onChange={handleChange}
          className="input-bordered"
          max={new Date().toISOString().split("T")[0]}
        />
        <CharCountInput
          name="street"
          value={adminForm.address.street}
          onChange={(e) =>
            handleChange({
              target: { name: "address.street", value: e.target.value },
            })
          }
          placeholder="Street"
          label="ADDRESS"
          helperText="Where is your castle placed?"
          maxLength={100}
        />
        <CharCountInput
          name="houseNumber"
          value={adminForm.address.houseNumber}
          onChange={(e) =>
            handleChange({
              target: { name: "address.houseNumber", value: e.target.value },
            })
          }
          placeholder="House Number"
          maxLength={10}
        />
        <CharCountInput
          name="postalCode"
          value={adminForm.address.postalCode}
          onChange={(e) =>
            handleChange({
              target: { name: "address.postalCode", value: e.target.value },
            })
          }
          placeholder="Postal Code"
          maxLength={10}
        />
        <CharCountInput
          name="city"
          value={adminForm.address.city}
          onChange={(e) =>
            handleChange({
              target: { name: "address.city", value: e.target.value },
            })
          }
          placeholder="City"
          maxLength={200}
        />
      </div>
      <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
        {/* <h3 className="title">YOU AS A PLAYER</h3> */}
        <div className="flex flex-row justify-between">
          <label className="label">EXPERIENCE</label>
          <p className="label-italic">How many enemies did you slay?</p>
        </div>
        <select
          name="experience"
          value={adminForm.experience}
          onChange={handleChange}
          className="input-bordered"
        >
          <option value="">Select experience</option>
          {experienceLevel.map((level) => (
            <option key={level._id} value={level._id}>
              {level.label}
            </option>
          ))}
        </select>
        <TagMultiSelect
          category="systems"
          label="GAME SYSTEM"
          helperText="What are you looking for?"
          name="systems"
          placeholder="Select preferences"
          onChange={(values) =>
            setAdminForm((prev) => ({
              ...prev,
              systems: values.map((s) => s),
            }))
          }
          value={adminForm.systems}
        />
      </div>

      <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
        {/* <h3 className="title">WHEN ARE YOU AVAILABLE?</h3> */}
        <div className="flex flex-row justify-between">
          <label className="label">WEEKDAYS</label>
          <p className="label-italic">More days, more adventures!</p>
        </div>
        <fieldset className="flex gap-1 flex-wrap mb-4">
          {daysOfWeek.map((day) => (
            <label
              key={day}
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "45px",
                height: "35px",
                borderRadius: "8px",
                cursor: "pointer",
                userSelect: "none",
                backgroundColor: adminForm.weekdays.includes(day)
                  ? "#4FCFFF"
                  : "#A7E7FF",
                color: "white",
                fontWeight: "bold",
                textTransadminForm: "capitalize",
                boxShadow: adminForm.weekdays.includes(day)
                  ? "0 4px 2px rgba(100, 100, 100, 0.5)"
                  : "0 4px 2px rgba(100, 100, 100, 0.2)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <input
                type="checkbox"
                name="weekdays"
                value={day}
                checked={adminForm.weekdays.includes(day)}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              {day}
            </label>
          ))}
        </fieldset>

        <label className="label">FREQUENCY</label>
        <div className="label flex flex-row">
          <input
            type="number"
            name="frequencyPerMonth"
            min={1}
            max={31}
            value={adminForm.frequencyPerMonth}
            onChange={handleChange}
            className="input-bordered ml-2"
          />
          <div className="label">TIMES</div>
          <div className="text-black font-bold">per Month</div>
        </div>

        <div className="mt-6 space-y-2 text-sm">
          <label className="flex justify-center items-center space-x-2">
            <input
              type="checkbox"
              name="terms"
              checked={adminForm.terms}
              onChange={handleChange}
              className="h-5 w-5 focus:ring-pnp-purple focus:ring-2 cursor-pointer"
              style={{ accentColor: "#6B46C1" }}
            />
            <span className="text-pnp-black font-semibold">
              I agree to the{" "}
              <button
                type="button"
                className="text-pnp-darkpurple underline hover:text-pnp-purple font-semibold cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Terms and Conditions
              </button>
            </span>
          </label>
        </div>

        <TermsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {/* EXTRA FIELDS */}
      <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
        <h2 className="mt-6 font-semibold">Additional Info</h2>
        <input
          name="avatarUrl"
          placeholder="Avatar URL"
          value={adminForm.avatarUrl}
          onChange={handleChange}
          className="input-bordered"
        />
        <div className="flex flex-row justify-between">
          <label className="label">PLAYING ROLES</label>
          <p className="label-italic">Are you a player or GM?</p>
        </div>
        <select
          name="playingRoles"
          value={adminForm.playingRoles}
          onChange={handleChange}
          className="input-bordered"
        >
          <option value="">Select playing roles</option>
          {playingRoles.map((level) => (
            <option key={level._id} value={level._id}>
              {level.label}
            </option>
          ))}
        </select>
        <div className="flex flex-row justify-between">
          <label className="label">PLAYING MODES</label>
          <p className="label-italic">Where do you want to play?</p>
        </div>
        <select
          name="playingModes"
          value={adminForm.playingModes}
          onChange={handleChange}
          className="input-bordered"
        >
          <option value="">Select playing modes</option>
          {playingModes.map((level) => (
            <option key={level._id} value={level._id}>
              {level.label}
            </option>
          ))}
        </select>
        <TagMultiSelect
          category="languages"
          label="LANGUAGES"
          helperText="Languages you know or prefer"
          name="languages"
          placeholder="Select languages"
          onChange={(values) =>
            setAdminForm((prev) => ({
              ...prev,
              languages: values.map((v) => v),
            }))
          }
          value={adminForm.languages}
        />
        <TagMultiSelect
          category="playstyles"
          label="PLAYSTYLES"
          helperText="What do you like?"
          name="playstyles"
          placeholder="Select playstyles"
          onChange={(values) =>
            setAdminForm((prev) => ({
              ...prev,
              playstyles: values.map((v) => v),
            }))
          }
          value={adminForm.playstyles}
        />
        <TagMultiSelect
          category="likes"
          label="LIKES"
          helperText="What do you like?"
          name="likes"
          placeholder="Select likes"
          onChange={(values) =>
            setAdminForm((prev) => ({
              ...prev,
              likes: values.map((v) => v),
            }))
          }
          value={adminForm.likes}
        />
        <TagMultiSelect
          category="dislikes"
          label="DISLIKES"
          helperText="What do you dislike?"
          name="dislikes"
          placeholder="Select dislikes"
          onChange={(values) =>
            setAdminForm((prev) => ({
              ...prev,
              dislikes: values.map((v) => v),
            }))
          }
          value={adminForm.dislikes}
        />
        <CharCountInput
          name="tagline"
          value={adminForm.tagline}
          onChange={handleChange}
          placeholder="Tagline"
          maxLength={150}
        />

        <CharCountInput
          name="description"
          value={adminForm.description}
          onChange={handleChange}
          placeholder="Description"
          maxLength={500} // Adjust the limit as appropriate
          multiline // Enables textarea mode if supported by your component
        />
      </div>

      <button
        type="submit"
        className="btn-primary-light mt-4"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Create User"}
      </button>
    </form>
  );
};

export default AdminDashboard;
