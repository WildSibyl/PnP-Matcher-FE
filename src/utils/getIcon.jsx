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
import D20svg from "../assets/d20.svg?react";
import Addsvg from "../assets/add.svg?react";
import Chatsvg from "../assets/chatbubble.svg?react";
import Refreshsvg from "../assets/refresh.svg?react";
import Searchsvg from "../assets/search.svg?react";

const getIcon = (tag) => {
  const icons = {
    Casual: Casualsvg,
    Fighter: Fightersvg,
    Improviser: Improvisersvg,
    Lorekeeper: Lorekeepersvg,
    Roleplayer: Roleplayersvg,
    "Rule-heavy": RulesHeavysvg,
    Specializer: Specialistsvg,
    Storyteller: Storytellersvg,
    Tactician: Tacticiansvg,
    User: Usersvg,
    "On-site": OnSitesvg,
    Online: Remotesvg,
    Both: OnSitesvg,
    Dice: Dicesvg,
    Experience: Experiencesvg,
    Filter: Filtersvg,
    Close: Closesvg,
    D20: D20svg,
    Chat: Chatsvg,
    Add: Addsvg,
    Refresh: Refreshsvg,
    Search: Searchsvg,
  };

  const IconComponent = icons[tag];

  if (IconComponent) {
    return <IconComponent className="w-[1rem]" />;
  } else {
    // //console.log("FindIcon: No icon for this input");
  }
};

export default getIcon;
