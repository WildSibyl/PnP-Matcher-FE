import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../data/auth";
import { useAuth } from "../hooks/useAuth";
import {
  systemsPreference,
  playstylesPreference,
  likesPreference,
  dislikesPreference,
  experienceLevel,
} from "../data/dropdowns/preferences";
import Select from "react-select";

import Step1UserInfo from "../components/register-comp/Step1UserInfo";
import Step2GameExperience from "../components/register-comp/Step2GameExperience";
import Step3Preferences from "../components/register-comp/Step3Preferences";
import Step4Schedule from "../components/register-comp/Step4Schedule";
import Step5Profile from "../components/register-comp/Step5Profile";

const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    zipCode: "",
    country: "",
    experience: "",
    systems: [],
    playstyles: [],
    likes: [],
    dislikes: [],
    days: [],
    frequencyPerMonth: 1,
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

  // Helpers for react-select multi-select updates
  const setMultiSelect = (name, selectedOptions) => {
    setForm((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((s) => s.value) : [],
    }));
  };

  const validateStep = () => {
    // Minimal validation per step
    switch (step) {
      case 1:
        if (
          !form.userName ||
          !form.email ||
          !form.password ||
          !form.confirmPassword ||
          !form.birthday ||
          !form.zipCode ||
          !form.country
        )
          return "Please fill all required fields in Step 1.";
        if (form.password !== form.confirmPassword)
          return "Passwords do not match.";
        break;
      case 2:
        if (!form.experience) return "Please select your experience.";
        if (form.systems.length === 0)
          return "Please select at least one system.";
        break;
      case 3:
        // Preferences can be optional; no validation required
        break;
      case 4:
        if (form.days.length === 0)
          return "Please select at least one day you play.";
        if (form.frequencyPerMonth < 1)
          return "Frequency per month must be at least 1.";
        break;
      case 5:
        if (!form.tagline || !form.description)
          return "Please fill out your tagline and description.";
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
      return;
    }

    setLoading(true);
    try {
      // Prepare payload
      const payload = {
        userName: form.userName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        birthday: new Date(form.birthday).toISOString(),
        zipCode: form.zipCode,
        country: form.country,
        experience: form.experience,
        systems: form.systems,
        playstyles: form.playstyles,
        likes: form.likes,
        dislikes: form.dislikes,
        days: form.days,
        frequencyPerMonth: form.frequencyPerMonth,
        tagline: form.tagline,
        description: form.description,
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
    console.log("Form submitted:", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-4 rounded-3xl bg-white p-6"
    >
      {step === 1 && <Step1UserInfo form={form} onChange={handleChange} />}
      {step === 2 && (
        <Step2GameExperience
          form={form}
          onChange={handleChange}
          setMultiSelect={setMultiSelect}
        />
      )}
      {step === 3 && (
        <Step3Preferences form={form} setMultiSelect={setMultiSelect} />
      )}
      {step === 4 && <Step4Schedule form={form} onChange={handleChange} />}
      {step === 5 && <Step5Profile form={form} onChange={handleChange} />}

      <div className="flex justify-between mt-6">
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
        {step < 5 ? (
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
            {loading ? "Creating..." : "Create Account"}
          </button>
        )}
      </div>

      {step === 1 && (
        <small>
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Log in!
          </Link>
        </small>
      )}
    </form>
  );
};

export default Register;
