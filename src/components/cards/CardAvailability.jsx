const CardAvailability = ({ weekdays, frequencyPerMonth }) => {
  const calculateDays = (weekdays) => {
    const weekdayOrder = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

    const normalizedWeekdays = weekdays
      .map((day) => day.trim().toUpperCase()) // normalize casing & trim whitespace
      .filter((day) => weekdayOrder.includes(day)); // remove invalid days

    const sortedWeekdays = [...normalizedWeekdays].sort(
      (a, b) => weekdayOrder.indexOf(a) - weekdayOrder.indexOf(b)
    );

    let weekdaysTeaser = [];
    if (sortedWeekdays.length > 3) {
      //Take the first two days
      weekdaysTeaser = [
        sortedWeekdays[0],
        sortedWeekdays[1],
        `+${sortedWeekdays.length - 2}`,
      ];
    } else if (weekdays.length > 0) {
      weekdaysTeaser = [
        sortedWeekdays[0],
        sortedWeekdays[1],
        sortedWeekdays[2],
      ];
    } else {
      weekdaysTeaser = [];
    }
    return weekdaysTeaser;
  };

  return (
    <div className="flex">
      <div
        className={` relative flex  ${
          weekdays.length > 0 && "gap-1 pl-2 pnp-badge-white"
        } pt-0 pr-0 pb-0 justify-center items-center pnp-shadow rounded-[7px]`}
      >
        {calculateDays(weekdays).map((e, index) => (
          <p key={index} className="text-sm font-extrabold  text-[#3E5466]">
            {e}
          </p>
        ))}
        <div
          className={`bg-pnp-blue ${
            weekdays.length > 0 && "ml-2"
          } pnp-shadow px-3 rounded-[7px] text-sm font-extrabold text-pnp-white z-[5]`}
        >{`${frequencyPerMonth}x / mo`}</div>
      </div>
    </div>
  );
};

export default CardAvailability;
