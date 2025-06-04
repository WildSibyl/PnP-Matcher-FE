import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createGroup } from "../data/groups";
import { useAuth } from "../hooks/useAuth";
import Step1GroupDetails from "../components/creategroup-comp/Step1GroupDetails";
import Step2GroupLocation from "../components/creategroup-comp/Step2GroupLocation";
import Step3GroupXPAndSystem from "../components/creategroup-comp/Step3GroupXPAndSystem";
import Step4GroupSchedule from "../components/creategroup-comp/Step4GroupSchedule";
import ProgressBar from "../components/register-comp/ProgressBar";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const [groupForm, setGroupForm] = useState({
    name: "",
    image: "",
    address: {
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
    },
    location: {
      type: "Point",
      coordinates: [0, 0], // [longitude, latitude]
    },
    experience: "",
    systems: [],
    weekdays: [],
    frequencyPerMonth: 1,
    playingModes: null,
    languages: [],
    playstyles: [],
    likes: [],
    dislikes: [],
    tagline: "",
    description: "",
    maxMembers: 5,
  });

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!groupForm.name || !groupForm.description || !groupForm.tagline)
          return "Please fill in all group details.";
        break;
      case 2:
        if (
          !groupForm.address.street ||
          !groupForm.address.houseNumber ||
          !groupForm.address.postalCode ||
          !groupForm.address.city ||
          groupForm.location.coordinates.includes(0)
        )
          return "Please complete the address and map location.";
        break;
      case 3:
        if (!groupForm.experience || groupForm.systems.length === 0)
          return "Please select experience and system(s).";
        break;
      case 4:
        if (groupForm.weekdays.length === 0)
          return "Select at least one weekday.";
        if (groupForm.languages.length === 0)
          return "Please choose at least one language.";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setGroupForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
      return;
    }

    if (name === "weekdays") {
      let newDays = [...groupForm.weekdays];
      if (checked) {
        if (!newDays.includes(value)) newDays.push(value);
      } else {
        newDays = newDays.filter((day) => day !== value);
      }
      setGroupForm((prev) => ({ ...prev, weekdays: newDays }));
    } else if (type === "number") {
      setGroupForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setGroupForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    const error = validateStep();
    if (error) {
      toast.error(error);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateStep();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...groupForm,
        systems: groupForm.systems.map((s) => s.id),
        location: {
          type: "Point",
          coordinates: groupForm.location.coordinates,
        },
      };

      console.log("Submitting group:", payload);
      await createGroup(payload); // Your custom API call
      toast.success("Group created successfully.");
      navigate("/groups");
    } catch (err) {
      toast.error(err.message || "Group creation failed.");
    } finally {
      setLoading(false);
    }
  };

  const setMultiSelect = (name, selectedOptions) => {
    setGroupForm((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((s) => s.value) : [],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <Step1GroupDetails groupForm={groupForm} onChange={handleChange} />
      )}
      {step === 2 && (
        <Step2GroupLocation
          groupForm={groupForm}
          onChange={handleChange}
          setGroupForm={setGroupForm}
        />
      )}
      {step === 3 && (
        <Step3GroupXPAndSystem
          groupForm={groupForm}
          onChange={handleChange}
          setMultiSelect={setMultiSelect}
        />
      )}
      {step === 4 && (
        <Step4GroupSchedule
          groupForm={groupForm}
          onChange={handleChange}
          setMultiSelect={setMultiSelect}
        />
      )}

      <ProgressBar step={step} />
      <div className="flex justify-between my-1 mx-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="btn-secondary-light"
            disabled={loading}
          >
            Back
          </button>
        ) : (
          <div />
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-primary-light"
            disabled={loading}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="btn-primary-light"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Group"}
          </button>
        )}
      </div>
    </form>
  );
};
export default CreateGroup;

//   const [form, setForm] = useState({
//     name: "",
//     image: "",
//     description: "",
//     zipCode: "",
//     country: "",
//     systems: "",
//     playstyles: "",
//     weekdays: [],
//     frequencyPerMonth: 1,
//     maxMembers: 10,
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { value, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       weekdays: checked
//         ? [...prev.weekdays, value]
//         : prev.weekdays.filter((day) => day !== value),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const {
//         name,
//         image,
//         description,
//         zipCode,
//         country,
//         systems,
//         playstyles,
//         weekdays,
//         frequencyPerMonth,
//         maxMembers,
//       } = form;

//       if (
//         !name ||
//         !image ||
//         !description ||
//         !zipCode ||
//         !country ||
//         !systems ||
//         !playstyles ||
//         weekdays.length === 0 ||
//         !frequencyPerMonth ||
//         !maxMembers
//       ) {
//         throw new Error("All fields are required");
//       }

//       setLoading(true);
//       const newGroup = await createGroup(form);
//       setForm({
//         name: "",
//         image: "",
//         description: "",
//         zipCode: "",
//         country: "",
//         systems: "",
//         playstyles: "",
//         weekdays: [],
//         frequencyPerMonth: 1,
//         maxMembers: 10,
//       });
//       navigate(`/group/${newGroup._id}`);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       className="md:w-1/2 mx-auto flex flex-col gap-3 bg-pnp-white"
//       onSubmit={handleSubmit}
//     >
//       <label className="form-control">
//         <div className="label-text">Group Name</div>
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Enter group name..."
//           className="input-bordered"
//         />
//       </label>

//       <label className="form-control">
//         <div className="label-text">Image URL</div>
//         <input
//           name="image"
//           value={form.image}
//           onChange={handleChange}
//           placeholder="Group image URL..."
//           className="input-bordered"
//         />
//       </label>

//       <label className="form-control">
//         <div className="label-text">Description</div>
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           className="textarea textarea-bordered h-24"
//         />
//       </label>

//       <label className="form-control">
//         <div className="label-text">Zip Code</div>
//         <input
//           name="zipCode"
//           value={form.zipCode}
//           onChange={handleChange}
//           className="input-bordered"
//         />
//       </label>

//       <label className="form-control">
//         <div className="label-text">Country</div>
//         <input
//           name="country"
//           value={form.country}
//           onChange={handleChange}
//           className="input-bordered"
//         />
//       </label>

//       <label className="form-control">
//         <div className="label-text">System</div>
//         <input
//           name="systems"
//           value={form.systems}
//           onChange={handleChange}
//           className="input-bordered"
//         />
//       </label>

//       <label className="form-control">
//         <div className="label-text">Playstyle</div>
//         <input
//           name="playstyles"
//           value={form.playstyles}
//           onChange={handleChange}
//           className="input-bordered"
//         />
//       </label>

//       <fieldset className="form-control">
//         <div className="label-text mb-2">Days of the Week</div>
//         <div className="flex gap-2 flex-wrap">
//           {dayOptions.map((day) => (
//             <label key={day} className="label cursor-pointer">
//               <input
//                 type="checkbox"
//                 name="weekdays"
//                 value={day}
//                 checked={form.weekdays.includes(day)}
//                 onChange={handleCheckboxChange}
//                 className="checkbox checkbox-sm"
//               />
//               <span className="ml-2 capitalize">{day}</span>
//             </label>
//           ))}
//         </div>
//       </fieldset>

//       <label className="form-control">
//         <div className="label-text">Frequency per Month</div>
//         <input
//           type="number"
//           name="frequencyPerMonth"
//           value={form.frequencyPerMonth}
//           onChange={handleChange}
//           min={1}
//           max={31}
//           className="input-bordered"
//         />
//       </label>

//       <label className="form-control">
//         <div className="label-text">Max Members</div>
//         <input
//           type="number"
//           name="maxMembers"
//           value={form.maxMembers}
//           onChange={handleChange}
//           min={1}
//           max={30}
//           className="input-bordered"
//         />
//       </label>

//       <button
//         className="btn btn-primary self-center mt-4"
//         type="submit"
//         disabled={loading}
//       >
//         {loading ? "Creating..." : "Create Group"}
//       </button>
//     </form>
//   );
// };

// export default CreateGroup;
