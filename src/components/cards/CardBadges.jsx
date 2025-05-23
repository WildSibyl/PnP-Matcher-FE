import { useState, useEffect } from "react";
import getIcon from "../../utils/getIcon";

const CardBadges = ({ details }) => {
  const [dispBadges, setDispBadges] = useState([]);

  // useEffect(() => {
  //   let badgeSelection = [];
  //   let maxBadges = 8;

  //   // let systems = details.systemsfilter((e) => e.category === "systems");
  //   // let playstyles = details.filter((e) => e.category === "playstyles");
  //   // let likes = details.filter((e) => e.category === "likes");

  //   const pickFrom = (list, count) => {
  //     //If there are more elements than "count2, take count elements, else take all
  //     const slice = list.slice(0, Math.min(count, list.length));
  //     badgeSelection.push(...slice);
  //     //substract number of taken elements from maxBadges
  //     maxBadges -= slice.length;
  //   };

  //   //Pick up to 3 Systems and Playstyles
  //   pickFrom(details.systems, 3);
  //   pickFrom(details.playstyles, 3);

  //   //Fill remaining space with likes
  //   pickFrom(details.likes, maxBadges);

  //   //set the selected badges
  //   setDispBadges(badgeSelection);
  // }, [details]);

  return (
    <>
      {/* {dispBadges?.map((e, index) => (
        <div
          key={index}
          className={`badge ${
            e.category === "likes" ? "pnp-badge-white" : "pnp-badge-black"
          } text-base`}
        >
          {getIcon(e.value)}
          {e.value}
        </div>
      ))}
      {details.length > dispBadges.length ? (
        <div className="badge pnp-badge-white text-base">
          +{details.length - dispBadges.length}
        </div>
      ) : (
        ""
      )} */}
      BADGES
    </>
  );
};

export default CardBadges;
