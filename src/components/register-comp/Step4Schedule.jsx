import TermsModal from "./TermsModal";
import React, { useState } from "react";

const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

const Step4Schedule = ({ regForm, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h3 className="title">WHEN ARE YOU AVAILABLE?</h3>
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
              backgroundColor: regForm.days.includes(day)
                ? "#4FCFFF"
                : "#A7E7FF",
              color: "white",
              fontWeight: "bold",
              textTransregForm: "capitalize",
              boxShadow: regForm.days.includes(day)
                ? "0 4px 2px rgba(100, 100, 100, 0.5)"
                : "0 4px 2px rgba(100, 100, 100, 0.2)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <input
              type="checkbox"
              name="days"
              value={day}
              checked={regForm.days.includes(day)}
              onChange={onChange}
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
          value={regForm.frequencyPerMonth}
          onChange={onChange}
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
            checked={regForm.terms}
            onChange={onChange}
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

      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Step4Schedule;
