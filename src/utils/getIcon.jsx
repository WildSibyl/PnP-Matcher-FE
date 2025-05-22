import Casualsvg from "../assets/playstyles/casual.svg?react";
import Fightersvg from "../assets/playstyles/fighter.svg?react";
import Improvisersvg from "../assets/playstyles/improviser.svg?react";
import Lorekeepersvg from "../assets/playstyles/lorekeeper.svg?react";
import Roleplayersvg from "../assets/playstyles/roleplayer.svg?react";
import RulesHeavysvg from "../assets/playstyles/rules-heavy.svg?react";
import Specialistsvg from "../assets/playstyles/specialist.svg?react";
import Storytellersvg from "../assets/playstyles/storyteller.svg?react";
import Tacticiansvg from "../assets/playstyles/tactician.svg?react";
import Usersvg from "../assets/user.svg?react";
import OnSitesvg from "../assets/onsite.svg?react";
import Remotesvg from "../assets/remote.svg?react";
import Dicesvg from "../assets/icon-dice.svg?react";
import Experiencesvg from "../assets/experience.svg?react";
import Closesvg from "../assets/close.svg?react";
import Filtersvg from "../assets/filter.svg?react";

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
    User: Usersvg,
    "On-site": OnSitesvg,
    Remote: Remotesvg,
    Dice: Dicesvg,
    Experience: Experiencesvg,
    Filter: Filtersvg,
    Close: Closesvg,
  };

  const IconComponent = icons[tag];

  if (IconComponent) {
    return <IconComponent className="w-[1rem]" />;
  } else {
    // console.log("FindIcon: No icon for this input");
  }
};

export default getIcon;
