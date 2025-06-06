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
    author: user._id,
    name: "",
    image: "",
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
    playingModes: null,
    languages: [],
    playstyles: [],
    likes: [],
    dislikes: [],
    tagline: "",
    description: "",
    members: [],
    maxMembers: 4,
  });

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!groupForm.name || !groupForm.tagline || !groupForm.maxMembers)
          return "Please fill in all group details.";
        break;
      case 2:
        if (
          !groupForm.address.street ||
          !groupForm.address.houseNumber ||
          !groupForm.address.postalCode ||
          !groupForm.address.city
        )
          return "Please complete the address correctly.";
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
        author: groupForm.author,
        name: groupForm.name,
        image: groupForm.image,
        address: {
          ...groupForm.address,
        },
        experience: groupForm.experience,
        systems: groupForm.systems.map((s) => {
          if (typeof s === "string") return s;
          return s.id;
        }),
        weekdays: groupForm.weekdays,
        frequencyPerMonth: groupForm.frequencyPerMonth,
        playingModes: groupForm.playingModes,
        languages: groupForm.languages.map((l) => {
          if (typeof l === "string") return l;
          return l.id;
        }),
        playstyles: groupForm.playstyles,
        likes: groupForm.likes,
        dislikes: groupForm.dislikes,
        tagline: groupForm.tagline,
        description: groupForm.description,
        members: groupForm.members,
        maxMembers: groupForm.maxMembers,
      };

      console.log("Submitting group:", payload);
      await createGroup(payload); // Your custom API call
      toast.success("Group created successfully.");
      navigate("/grouplist");
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
    <form
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
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
          setGroupForm={setGroupForm}
          onChange={handleChange}
          setMultiSelect={setMultiSelect}
        />
      )}
      {step === 4 && (
        <Step4GroupSchedule
          groupForm={groupForm}
          setGroupForm={setGroupForm}
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
            key="button" ////key to fix the event propagation bug
            type="button"
            onClick={handleNext}
            className="btn-primary-light"
            disabled={loading}
          >
            Next
          </button>
        ) : (
          <button
            key="submit" //key to fix the event propagation bug
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
