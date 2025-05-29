import renimg from "../../assets/ren/Ren-die.png";
import getIcon from "../../utils/getIcon";
import D20svg from "../../assets/d20.svg?react";

const RollForGroup = () => {
  return (
    <div className="flex flex-col mx-auto w-[95vw] min-w-[350px] max-w-[500px] bg-linear-165 from-pnp-darkpurple to-pnp-darkblue rounded-2xl">
      <p className="text-2xl font-extrabold text-pnp-white pt-4 px-4">
        Looking for Adventurers?
      </p>
      {/*  Header with Ren */}
      <div>
        <div className="flex">
          <div className="flex flex-col pl-4 py-4">
            <p className="text-pnp-white pb-2">
              Roll the{" "}
              <span className="font-extrabold text-[#FCFC3B]">MAGIC DICE</span>{" "}
              and the wizard will find you players that fit your group perfectly
            </p>
            <button className="btn-primary-light self-start">
              <D20svg className="w-[3rem]" />
              ROLL NOW!
            </button>
          </div>
          <div className="flex justify-end overflow-hidden h-auto min-w-[150px] w-[50%] relative">
            <img
              src={renimg}
              alt="Ren, our mascot"
              className="absolute mx-auto w-auto max-h-[100%] bottom-0 translate-y-2"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollForGroup;
