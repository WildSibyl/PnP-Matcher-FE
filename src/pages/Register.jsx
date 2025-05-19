import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../data/auth";
import { useAuth } from "../hooks/useAuth";

import Step1UserInfo from "../components/register-comp/Step1UserInfo";
import Step2AgeAndLocation from "../components/register-comp/Step2AgeAndLocation";
import Step3ExperienceAndSystem from "../components/register-comp/Step3ExperienceAndSystem";
import Step4Schedule from "../components/register-comp/Step4Schedule";

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
    days: [],
    frequencyPerMonth: 1,
    playingRole: [],
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
          !form.confirmPassword
        )
          return "Please fill all required fields.";
        if (form.password !== form.confirmPassword)
          return "Passwords do not match.";
        break;
      case 2:
        if (!form.birthday || !form.zipCode || !form.country)
          return "Please fill all required fields.";
        break;
      case 3:
        if (!form.experience) return "Please select your experience.";
        if (form.systems.length === 0)
          return "Please select at least one system.";
        break;
      case 4:
        if (form.days.length === 0)
          return "Please select at least one day you play.";
        if (form.frequencyPerMonth < 1)
          return "Frequency per month must be at least 1.";
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
        days: form.days,
        frequencyPerMonth: form.frequencyPerMonth,
        playingRole: form.playingRole,
        playstyles: form.playstyles,
        likes: form.likes,
        dislikes: form.dislikes,
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
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
        {step === 1 && <Step1UserInfo form={form} onChange={handleChange} />}
        {step === 2 && (
          <Step2AgeAndLocation
            form={form}
            onChange={handleChange}
            setMultiSelect={setMultiSelect}
          />
        )}
        {step === 3 && (
          <Step3ExperienceAndSystem
            form={form}
            onChange={handleChange}
            setMultiSelect={setMultiSelect}
            setForm={setForm}
          />
        )}
        {step === 4 && <Step4Schedule form={form} onChange={handleChange} />}
      </div>
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
