import "../../DiceLoader.css";

import Lorekeepersvg from "../../assets/playstyles/lorekeeper.svg?react";
import Roleplayersvg from "../../assets/playstyles/roleplayer.svg?react";
import RulesHeavysvg from "../../assets/playstyles/rules-heavy.svg?react";
import Specialistsvg from "../../assets/playstyles/specialist.svg?react";
import Storytellersvg from "../../assets/playstyles/storyteller.svg?react";
import Tacticiansvg from "../../assets/playstyles/tactician.svg?react";

export default function DiceLoader() {
  return (
    <div className="dice-container">
      <div className="dice rotating">
        <div className="side one">
          <Lorekeepersvg />
        </div>
        <div className="side two">
          <Roleplayersvg />
        </div>
        <div className="side three">
          <RulesHeavysvg />
        </div>
        <div className="side four">
          <Specialistsvg />
        </div>
        <div className="side five">
          <Storytellersvg />
        </div>
        <div className="side six">
          <Tacticiansvg />
        </div>
      </div>
    </div>
  );
}
