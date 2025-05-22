import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../data/auth";
import { useAuth } from "../hooks/useAuth";

import Step1UserInfo from "../components/register-comp/Step1UserInfo";
import Step2AgeAndLocation from "../components/register-comp/Step2AgeAndLocation";
import Step3ExperienceAndSystem from "../components/register-comp/Step3ExperienceAndSystem";
import Step4Schedule from "../components/register-comp/Step4Schedule";
import ProgressBar from "../components/register-comp/ProgressBar";

const Register = () => {
  const [regForm, setRegForm] = useState({
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
    days: [],
    frequencyPerMonth: 1,
    terms: false,
    playingRoles: [],
    languages: [],
    playstyles: [],
    likes: [],
    dislikes: [],
    tagline: "",
    description: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return <Navigate to="/" />;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setRegForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
      return;
    }

    if (name === "days") {
      let newDays = [...regForm.days];
      if (checked) {
        if (!newDays.includes(value)) newDays.push(value);
      } else {
        newDays = newDays.filter((day) => day !== value);
      }
      setRegForm((prev) => ({ ...prev, days: newDays }));
    } else if (type === "number") {
      setRegForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "terms") {
      // Handle single checkbox boolean here (like 'terms')
      setRegForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setRegForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Helpers for react-select multi-select updates
  const setMultiSelect = (name, selectedOptions) => {
    setRegForm((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((s) => s.value) : [],
    }));
  };

  const validateStep = () => {
    // Minimal validation per step
    switch (step) {
      case 1:
        if (
          !regForm.userName ||
          !regForm.email ||
          !regForm.password ||
          !regForm.confirmPassword
        )
          return "Please fill all required fields.";
        if (regForm.password !== regForm.confirmPassword)
          return "Passwords do not match.";
        break;
      case 2:
        if (
          !regForm.birthday ||
          !regForm.address.street ||
          !regForm.address.houseNumber ||
          !regForm.address.postalCode ||
          !regForm.address.city
        )
          return "Please fill all required fields.";
        break;
      case 3:
        if (!regForm.experience) return "Please select your experience.";
        if (regForm.systems.length === 0)
          return "Please select at least one system.";
        break;
      case 4:
        if (regForm.days.length === 0)
          return "Please select at least one day you play.";
        if (regForm.frequencyPerMonth < 1)
          return "Frequency per month must be at least 1.";
        break;
        if (!regForm.terms) return "Please accept the Terms and Conditions.";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleNext = () => {
    const error = validateStep();
    if (error) {
      toast.error(error);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate last step again
    const error = validateStep();
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
      return;
    }

    setLoading(true);
    try {
      // Prepare payload
      const payload = {
        userName: regForm.userName,
        email: regForm.email,
        password: regForm.password,
        confirmPassword: regForm.confirmPassword,
        birthday: new Date(regForm.birthday).toISOString(),
        address: {
          ...regForm.address,
        },
        experience: regForm.experience,
        systems: regForm.systems,
        days: regForm.days,
        frequencyPerMonth: regForm.frequencyPerMonth,
        terms: regForm.terms,
        playingRoles: regForm.playingRoles,
        languages: regForm.languages,
        playstyles: regForm.playstyles,
        likes: regForm.likes,
        dislikes: regForm.dislikes,
        tagline: regForm.tagline,
        description: regForm.description,
        groups: [],
      };

      //console.log("Payload being sent to backend:", payload);

      await signUp(payload);
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    console.log("Form submitted:", regForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
        {step === 1 && (
          <Step1UserInfo regForm={regForm} onChange={handleChange} />
        )}
        {step === 2 && (
          <Step2AgeAndLocation regForm={regForm} onChange={handleChange} />
        )}
        {step === 3 && (
          <Step3ExperienceAndSystem
            regForm={regForm}
            onChange={handleChange}
            setMultiSelect={setMultiSelect}
            setRegForm={setRegForm}
          />
        )}
        {step === 4 && (
          <Step4Schedule regForm={regForm} onChange={handleChange} />
        )}
      </div>
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
            {loading ? "Creating..." : "Create Account"}
          </button>
        )}
      </div>

      {step === 1 && (
        <small className="text-pnp-white hover:underline justify-center flex">
          Already have an account?{" "}
          <Link to="/login" className="text-pnp-purple hover:underline ml-2">
            Log in!
          </Link>
        </small>
      )}
    </form>
  );
};

export default Register;
