const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const Step4Schedule = ({ form, onChange }) => (
  <>
    <fieldset className="flex gap-2 flex-wrap">
      <legend className="label">Days you play:</legend>
      {daysOfWeek.map((day) => (
        <label key={day} className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            name="days"
            value={day}
            checked={form.days.includes(day)}
            onChange={onChange}
            className="checkbox"
          />
          {day.toUpperCase()}
        </label>
      ))}
    </fieldset>

    <label className="label mt-4">
      Frequency per month:
      <input
        type="number"
        name="frequencyPerMonth"
        min={1}
        max={31}
        value={form.frequencyPerMonth}
        onChange={onChange}
        className="input input-bordered ml-2"
      />
    </label>
  </>
);

export default Step4Schedule;
