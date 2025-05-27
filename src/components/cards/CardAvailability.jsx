const CardAvailability = ({ weekdays, frequencyPerMonth }) => {
  const calculateDays = (weekdays) => {
    let weekdaysTeaser = [];
    if (weekdays.length > 3) {
      //Take the first two days
      weekdaysTeaser = [weekdays[0], weekdays[1], `+${weekdays.length - 2}`];
    } else if (weekdays.length > 0) {
      weekdaysTeaser = [weekdays[0], weekdays[1], weekdays[2]];
    } else {
      weekdaysTeaser = [];
    }
    return weekdaysTeaser;
  };

  return (
    <div className="flex">
      <div className="pnp-badge-white relative flex gap-1 pl-2 pt-0 pr-0 pb-0 justify-center items-center pnp-shadow rounded-[7px]">
        {calculateDays(weekdays).map((e, index) => (
          <p key={index} className="text-sm font-extrabold  text-[#3E5466]">
            {e}
          </p>
        ))}
        <div className="bg-pnp-blue ml-2 pnp-shadow px-3 rounded-[7px] text-sm font-extrabold text-pnp-white z-[5]">{`${frequencyPerMonth}x / mo`}</div>
      </div>
    </div>
  );
};

export default CardAvailability;
