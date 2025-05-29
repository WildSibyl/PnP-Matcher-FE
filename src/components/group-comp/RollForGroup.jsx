import { useState, useEffect } from "react";

import renimg from "../../assets/ren/Ren-die.png";
import getIcon from "../../utils/getIcon";
import D20svg from "../../assets/d20.svg?react";
import DiceLoader from "./DiceLoader";

const RollForGroup = () => {
  const [state, setState] = useState("default");
  const [playerNum, setPlayerNum] = useState(1);
  const [maxPlayerNum, setMaxPlayerNum] = useState(4);

  useEffect(() => {
    let currPlayerNum = 1;

    if (state === "roll") {
      const rollInterval = setInterval(() => {
        if (currPlayerNum >= maxPlayerNum) {
          clearInterval(rollInterval);
          setState("results");
        } else {
          currPlayerNum++;
          setPlayerNum(currPlayerNum);
        }
      }, 700);
      return () => clearInterval(rollInterval);
    }
  }, [state]);

  return (
    <div className="flex flex-col mx-auto w-[95vw] min-w-[350px] max-w-[500px] bg-linear-165 from-pnp-darkpurple to-pnp-darkblue rounded-2xl">
      <p className="text-2xl font-extrabold text-pnp-white pt-4 px-4">
        {state === "results"
          ? "THE DICE HAVE SPOKEN!"
          : "Looking for Adventurers?"}
      </p>
      {/*  Header with Ren */}
      <div>
        <div className="flex">
          <div className="flex flex-col pl-4 py-4">
            <p className="text-pnp-white pb-2">
              {state === "results"
                ? "These players should be a perfect match for your group!"
                : `Roll the ${(
                    <span className="font-extrabold text-[#FCFC3B]">
                      MAGIC DICE
                    </span>
                  )} and the wizard will find you players that fit your group perfectly`}
            </p>
            {state === "default" ? (
              <button
                onClick={() => setState("roll")}
                className="btn-primary-light self-start"
              >
                <D20svg className="w-[3rem]" />
                ROLL NOW!
              </button>
            ) : (
              ""
            )}
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

      {/* Results */}
      <div className="flex justify-center text-pnp-white text-center">
        {state === "roll" ? (
          <div className="flex flex-col justify-center items-center">
            <DiceLoader />
            <h3>
              Rolling for players ({playerNum} / {maxPlayerNum})...
            </h3>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RollForGroup;
