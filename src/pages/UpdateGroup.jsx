import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleGroup, updateGroup } from "../data/groups";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    country: "",
    zipCode: "",
    systems: [],
    playstyles: [],
    days: [],
    frequencyPerMonth: 1,
    likes: [],
    dislikes: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const group = await getSingleGroup(id);
        setForm({
          name: group.name || "",
          image: group.image || "",
          description: group.description || "",
          country: group.country || "",
          zipCode: group.zipCode || "",
          systems: group.systems || [],
          playstyles: group.playstyles || [],
          days: group.days || [],
          frequencyPerMonth: group.frequencyPerMonth || "",
          maxMembers: group.maxMembers || [],
        });
      } catch (error) {
        toast.error("Failed to load group data.");
      }
    };

    if (id) fetchGroup();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update this group?")) {
      try {
        setLoading(true);
        const updatedGroup = await updateGroup(id, form);
        toast.success("Group updated successfully");
        navigate(`/group/${updatedGroup._id}`);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      className="md:w-1/2 mx-auto flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      {[
        ["name", "Group Name"],
        ["image", "Image URL"],
        ["description", "Description"],
        ["country", "Country"],
        ["zipCode", "ZIP Code"],
        ["systems", "System (e.g. D&D 5e)"],
        ["playstyles", "Playstyle (e.g. Casual, Hardcore)"],
        ["frequencyPerMonth", "Sessions per Month"],
        ["maxMembers", "Maximum Members"],
      ].map(([field, label]) => (
        <label key={field} className="form-control">
          <div className="label-text">{label}</div>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>
      ))}

      {/* Optional: you can add a days multi-select or comma-separated input */}
      <label className="form-control">
        <div className="label-text">Days (comma-separated)</div>
        <input
          name="days"
          value={form.days.join(", ")}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              days: e.target.value.split(",").map((d) => d.trim()),
            }))
          }
          className="input input-bordered w-full"
        />
      </label>

      <button className="btn btn-primary self-center" disabled={loading}>
        Save Group
      </button>
    </form>
  );
};

export default UpdateGroup;
