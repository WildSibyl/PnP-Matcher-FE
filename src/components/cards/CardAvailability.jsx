const CardAvailability = () => {
  const available = ["MO", "WE", "SA"];
  const frequencyPerMonth = 3;

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
    console.log(daysTeaser);
    return daysTeaser;
  };

  return (
    <div className="flex">
      <div className="flex gap-1 pnp-shadow px-4 py-2 pr-6 rounded-[7px]">
        {calculateDays(available).map((e, index) => (
          <p key={index} className="text-sm font-extrabold text-[#3E5466]">
            {e}
          </p>
        ))}
      </div>
      <div className="bg-pnp-blue pnp-shadow px-4 py-2 rounded-[7px] text-sm font-extrabold text-pnp-white z-[5]">{`${frequencyPerMonth}x / mo`}</div>
    </div>
  );
};

export default CardAvailability;
