import Starsvg from "../../assets/star.svg?react";

const MatchingValue = ({ matchValue }) => {
  return (
    <>
      {matchValue > 77 ? (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-3 z-50">
          <div className="flex items-center gap-2 font-extrabold text-pnp-white rounded-full bg-linear-165 box-border from-pnp-darkpurple to-pnp-darkblue px-3 py-1">
            <Starsvg className="text-pnp-white max-w-[1rem]" /> <p>85%</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MatchingValue;
