import { useState, useEffect } from "react";
import iconDice from "../assets/icon-dice.svg";

const Chip = ({ icon, text, color }) => {
  const [chipData, setChipData] = useState(null);
  console.log(color);

  //Determine color
  useEffect(() => {
    let colorClass = "";
    let iconClass = "";

    switch (color) {
      case "green":
        colorClass = "bg-green-400";
        break;
      case "purple":
        colorClass = "bg-purple-400";
        break;
      case "blue":
        colorClass = "bg-purple-400";
        break;
      case "black":
        colorClass = "bg-purple-400";
        break;
      default:
        colorClass = `bg-[#${color}]`;
        break;
    }

    switch (icon) {
      case "dice":
        iconClass = iconDice;
        break;
      default:
        iconClass = "none";
        break;
    }

    setChipData({ icon: iconClass, text, color: colorClass });
  }, [icon, text, color]);

  if (!chipData?.color || chipData?.icon === "none") return null;

  return (
    <div
      className={`${chipData.color} flex w-max min-w-[150px] gap-4 rounded-full px-2 py-2`}
    >
      {chipData.icon ? <img src={chipData.icon} /> : ""}
      <p>{chipData.text}</p>
    </div>
  );
};

export default Chip;
