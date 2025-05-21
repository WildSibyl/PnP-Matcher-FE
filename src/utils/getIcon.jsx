import Casualsvg from "../assets/playstyles/casual.svg?react";
import Fightersvg from "../assets/playstyles/fighter.svg?react";
import Improvisersvg from "../assets/playstyles/improviser.svg?react";
import Lorekeepersvg from "../assets/playstyles/lorekeeper.svg?react";
import Roleplayersvg from "../assets/playstyles/roleplayer.svg?react";
import RulesHeavysvg from "../assets/playstyles/rules-heavy.svg?react";
import Specialistsvg from "../assets/playstyles/specialist.svg?react";
import Storytellersvg from "../assets/playstyles/storyteller.svg?react";
import Tacticiansvg from "../assets/playstyles/tactician.svg?react";

const getIcon = (tag) => {
  const icons = {
    Casual: Casualsvg,
    Fighter: Fightersvg,
    Improviser: Improvisersvg,
    Lorekeeper: Lorekeepersvg,
    Roleplayer: Roleplayersvg,
    "Rules-heavy": RulesHeavysvg,
    Specialist: Specialistsvg,
    Storyteller: Storytellersvg,
    Tactician: Tacticiansvg,
  };

  const IconComponent = icons[tag];

  if (IconComponent) {
    return <IconComponent className="w-[1rem]" />;
  } else {
    console.log("FindIcon: No icon for this input");
  }
};

export default getIcon;
