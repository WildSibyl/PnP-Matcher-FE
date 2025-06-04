import Starsvg from "../../assets/star.svg?react";

const MatchingValue = ({ matchScore }) => {
  if (!matchScore || matchScore === "string") return "";
  return (
    <>
      {matchScore > 0 ? (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-3 z-[45]">
          <div className="flex items-center gap-2 font-extrabold text-pnp-white rounded-full bg-linear-165 box-border from-pnp-darkpurple to-pnp-darkblue px-3 py-1">
            <Starsvg className="text-pnp-white max-w-[1rem]" />{" "}
            <p>{matchScore}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MatchingValue;
