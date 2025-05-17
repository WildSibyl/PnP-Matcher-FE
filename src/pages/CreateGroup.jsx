import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createGroup } from "../data/groups";

const dayOptions = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const CreateGroup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    zipCode: "",
    country: "",
    systems: "",
    playstyles: "",
    days: [],
    frequencyPerMonth: 1,
    maxMembers: 10,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      days: checked
        ? [...prev.days, value]
        : prev.days.filter((day) => day !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        name,
        image,
        description,
        zipCode,
        country,
        systems,
        playstyles,
        days,
        frequencyPerMonth,
        maxMembers,
      } = form;

      if (
        !name ||
        !image ||
        !description ||
        !zipCode ||
        !country ||
        !systems ||
        !playstyles ||
        days.length === 0 ||
        !frequencyPerMonth ||
        !maxMembers
      ) {
        throw new Error("All fields are required");
      }

      setLoading(true);
      const newGroup = await createGroup(form);
      setForm({
        name: "",
        image: "",
        description: "",
        zipCode: "",
        country: "",
        systems: "",
        playstyles: "",
        days: [],
        frequencyPerMonth: 1,
        maxMembers: 10,
      });
      navigate(`/group/${newGroup._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="md:w-1/2 mx-auto flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <label className="form-control">
        <div className="label-text">Group Name</div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter group name..."
          className="input input-bordered"
        />
      </label>

      <label className="form-control">
        <div className="label-text">Image URL</div>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Group image URL..."
          className="input input-bordered"
        />
      </label>

      <label className="form-control">
        <div className="label-text">Description</div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
        />
      </label>

      <label className="form-control">
        <div className="label-text">Zip Code</div>
        <input
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          className="input input-bordered"
        />
      </label>

      <label className="form-control">
        <div className="label-text">Country</div>
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          className="input input-bordered"
        />
      </label>

      <label className="form-control">
        <div className="label-text">System</div>
        <input
          name="systems"
          value={form.systems}
          onChange={handleChange}
          className="input input-bordered"
        />
      </label>

      <label className="form-control">
        <div className="label-text">Playstyle</div>
        <input
          name="playstyles"
          value={form.playstyles}
          onChange={handleChange}
          className="input input-bordered"
        />
      </label>

      <fieldset className="form-control">
        <div className="label-text mb-2">Days of the Week</div>
        <div className="flex gap-2 flex-wrap">
          {dayOptions.map((day) => (
            <label key={day} className="label cursor-pointer">
              <input
                type="checkbox"
                name="days"
                value={day}
                checked={form.days.includes(day)}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-sm"
              />
              <span className="ml-2 capitalize">{day}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="form-control">
        <div className="label-text">Frequency per Month</div>
        <input
          type="number"
          name="frequencyPerMonth"
          value={form.frequencyPerMonth}
          onChange={handleChange}
          min={1}
          max={31}
          className="input input-bordered"
        />
      </label>

      <label className="form-control">
        <div className="label-text">Max Members</div>
        <input
          type="number"
          name="maxMembers"
          value={form.maxMembers}
          onChange={handleChange}
          min={1}
          max={30}
          className="input input-bordered"
        />
      </label>

      <button
        className="btn btn-primary self-center mt-4"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Group"}
      </button>
    </form>
  );
};

export default CreateGroup;
