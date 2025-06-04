import TagMultiSelect from "../edit-comp/TagMultiSelect";
import RenBook from "../../assets/ren/Ren-book.png";

const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

const Step4GroupSchedule = ({ groupForm, setGroupForm, onChange }) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-center mx-4">
          <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 rounded-2xl p-2 px-3 mx-2">
            We are nearly finished! But now for the real endboss of all P&P
            groups: Availability and communication!
          </p>
          <img src={RenBook} alt="Ren holding a book" className="h-[150px]" />
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-white p-6">
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
                  backgroundColor: groupForm.weekdays.includes(day)
                    ? "#4FCFFF"
                    : "#A7E7FF",
                  color: "white",
                  fontWeight: "bold",
                  textTransgroupForm: "capitalize",
                  boxShadow: groupForm.weekdays.includes(day)
                    ? "0 4px 2px rgba(100, 100, 100, 0.5)"
                    : "0 4px 2px rgba(100, 100, 100, 0.2)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <input
                  type="checkbox"
                  name="weekdays"
                  value={day}
                  checked={groupForm.weekdays.includes(day)}
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
              value={groupForm.frequencyPerMonth}
              onChange={onChange}
              className="input-bordered ml-2"
            />
            <div className="label">TIMES</div>
            <div className="text-black font-bold">per Month</div>
          </div>
          <TagMultiSelect
            category="languages"
            label="LANGUAGES"
            helperText="What is your common tongue?"
            name="languages"
            placeholder="Select preferences"
            value={groupForm.languages}
            onChange={(values) =>
              setGroupForm({
                ...groupForm,
                languages: values.map((l) => l),
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default Step4GroupSchedule;
