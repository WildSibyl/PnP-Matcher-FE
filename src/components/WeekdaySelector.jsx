import { useState, useEffect } from "react";

const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

const WeekdaySelector = ({ weekdays = [], label, onChange }) => {
  const [newSelection, setNewSelection] = useState([...weekdays]);

  const toggleDay = (day) => {
    let updated;
    if (newSelection.includes(day)) {
      updated = newSelection.filter((d) => d !== day);
    } else {
      updated = [...newSelection, day];
    }

    setNewSelection(updated);
    onChange?.(updated);
  };

  useEffect(() => {
    setNewSelection(weekdays);
  }, [weekdays]);

  if (!newSelection) return <></>;
  return (
    <>
      <div className="flex flex-row justify-between">
        <label className="label">WEEKDAYS</label>
        <p className="label-italic">{label ? label : ""}</p>
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
              backgroundColor: newSelection.includes(day)
                ? "#4FCFFF"
                : "#A7E7FF",
              color: "white",
              fontWeight: "bold",
              textTransform: "capitalize",
              boxShadow: weekdays.includes(day)
                ? "0 4px 2px rgba(100, 100, 100, 0.5)"
                : "0 4px 2px rgba(100, 100, 100, 0.2)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <input
              type="checkbox"
              name="weekdays"
              value={day}
              checked={newSelection.includes(day)}
              style={{ display: "none" }}
              onClick={() => toggleDay(day)}
              readOnly
            />
            {day}
          </label>
        ))}
      </fieldset>
    </>
  );
};

export default WeekdaySelector;
