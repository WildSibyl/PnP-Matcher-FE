import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

import renimg from "../../assets/ren/Ren-die.png";
import getIcon from "../../utils/getIcon";
import D20svg from "../../assets/d20.svg?react";
import DiceLoader from "./DiceLoader";
import { getRollMatches } from "../../data/user";
import PlayerCard from "../cards/PlayerCard";

const RollForGroup = () => {
  const [state, setState] = useState("default");
  const [playerNum, setPlayerNum] = useState(1);
  const [maxPlayerNum, setMaxPlayerNum] = useState(4);
  const [playerResults, setPlayerResults] = useState([]);

  const hasRolled = useRef(false);

  useEffect(() => {
    if (state === "roll" && !hasRolled.current) {
      let currPlayerNum = 1;
      let rollInterval;
      let currMaxPlayer;

      const startRolling = async () => {
        try {
          const rolledUsers = await getRollMatches(10000000);
          currMaxPlayer = Math.min(rolledUsers.length, 4);
          setMaxPlayerNum(currMaxPlayer);

          if (!rolledUsers || rolledUsers.length === 0) {
            throw new Error("No users rolled");
          }
          console.log("Rolled ", rolledUsers);
          hasRolled.current = true;

          // Start Intervall, nachdem Daten da sind
          setPlayerResults([rolledUsers[0]]);
          rollInterval = setInterval(() => {
            currPlayerNum++;
            setPlayerNum(currPlayerNum);
            setPlayerResults((prev) => [
              ...prev,
              rolledUsers[currPlayerNum - 1],
            ]);
            if (currPlayerNum >= currMaxPlayer) {
              clearInterval(rollInterval);
              setTimeout(() => {
                setState("results");
              }, 1000);
            }
          }, 700);
        } catch (error) {
          console.error("Couldn't roll for users:", error.message);
          if (error.message === "Not enough users nearby") {
            setTimeout(() => {
              setState("error");
              hasRolled.current = false;
            }, 3000);
          } else {
            setState("default");
            hasRolled.current = false;
          }
        }
      };

      startRolling();

      return () => clearInterval(rollInterval);
    }
  }, [state]);

  return (
    <div className="flex flex-col mx-auto w-[95vw] min-w-[350px] max-w-[520px] bg-linear-165 from-pnp-darkpurple to-pnp-darkblue rounded-2xl">
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
              {state === "results" ? (
                "These players should be a perfect match for your group!"
              ) : (
                <>
                  Roll the{" "}
                  <span className="font-extrabold text-[#FCFC3B]">
                    MAGIC DICE
                  </span>{" "}
                  and the wizard will find you players that fit your group
                  perfectly
                </>
              )}
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

      {/* Loading */}
      <div className="flex flex-col justify-center text-pnp-white text-center">
        {state === "roll" && (
          <>
            <div className="flex flex-col justify-center items-center">
              <DiceLoader />
              <h3>
                Rolling for players ({playerNum} / {maxPlayerNum})...
              </h3>
            </div>
          </>
        )}
        <div className="flex justify-center gap-2">
          {state === "roll" &&
            playerResults &&
            playerResults.map((e) => (
              <img
                key={e._id}
                className="rounded-full h-auto w-[80px] border-2 my-4"
                style={{
                  animationName: "fadeIn",
                  animationDuration: "0.5s",
                  animationFillMode: "forwards",
                  animationTimingFunction: "ease",
                  opacity: 0,
                }}
                src={e.avatarUrl}
              />
            ))}
        </div>
        {/* Results */}
        <div className="flex flex-col">
          {state === "error" && (
            <p className="label-italic text-pnp-white bg-pnp-darkpurple/50 mb-2 rounded-2xl p-2 px-3 mx-2">
              The magic dice couln't find enough matching users nearby. Please
              come again later...
            </p>
          )}
          {state === "results" && (
            <>
              {playerResults &&
                playerResults.map((e, index) => (
                  <div
                    key={e._id}
                    style={{
                      animationName: "fadeIn",
                      animationDuration: "0.5s",
                      animationFillMode: "forwards",
                      animationTimingFunction: "ease",
                      animationDelay: `${index * 200}ms`,
                      opacity: 0,
                    }}
                    className="animate-fade-in"
                  >
                    <PlayerCard details={e} />
                  </div>
                ))}
              <div className="relative w-full flex flex-col items-center justify-center pb-4">
                <h3>Not what you've been looking for?</h3>
                <div className="flex w-[75%] gap-3 justify-center">
                  <Link to="/search" className="btn-secondary-light">
                    {getIcon("Search")} Go to Search
                  </Link>
                  <button
                    className="btn-secondary-light"
                    onClick={() => {
                      hasRolled.current = false;
                      setState("roll");
                    }}
                  >
                    {getIcon("Refresh")} Reroll Players
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RollForGroup;
