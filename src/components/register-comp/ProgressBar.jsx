const ProgressBar = ({ step }) => {
  const totalSteps = 4;
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div className="w-full px-6 my-1 justify-center flex flex-col items-center">
      <div className="text-sm font-medium text-center mb-2 text-pnp-white ">
        Step {step}/{totalSteps}
      </div>
      <div className="rounded-full bg-gray-300 overflow-hidden h-3 w-[70%]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pnp-purple to-pnp-blue transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
