const CardAvailability = ({ days, frequencyPerMonth }) => {
  const calculateDays = (days) => {
    let daysTeaser = [];
    if (days.length > 3) {
      //Take the first two days
      daysTeaser = [days[0], days[1], `+${days.length - 2}`];
    } else if (days.length > 0) {
      daysTeaser = [days[0], days[1], days[2]];
    } else {
      daysTeaser = [];
    }
    return daysTeaser;
  };

  return (
    <div className="flex">
      <div className="pnp-badge-white relative flex gap-1 pl-2 pt-0 pr-0 pb-0 justify-center items-center pnp-shadow rounded-[7px]">
        {calculateDays(days).map((e, index) => (
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
