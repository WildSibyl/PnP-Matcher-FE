import { useState, useEffect } from "react";
import getIcon from "../../utils/getIcon";

const CardBadges = ({ details }) => {
  const [dispBadges, setDispBadges] = useState([]);

  if (!details)
    return (
      <>
        <h3>Loading users</h3>
      </>
    );

  useEffect(() => {
    let badgeSelection = [];
    let maxBadges = 8;

    const pickFrom = (list, count) => {
      // console.log("List ", list);
      //If there are more elements than "count", take count elements, else take all
      if (list && list.length > 0) {
        const arrValues = list.map((s) => s.value);
        const slice = arrValues.slice(0, Math.min(count, list.length));
        badgeSelection.push(...slice);
        //substract number of taken elements from maxBadges
        maxBadges -= slice.length;
      }
    };

    //Pick up to 3 Systems and Playstyles
    pickFrom(details.systems, 3);
    pickFrom(details.playstyles, 3);

    //Fill remaining space with likes
    pickFrom(details.likes, maxBadges);

    //set the selected badges
    setDispBadges(badgeSelection);
  }, []);

  // console.log("Details ", details);

  return (
    <div className="text-left">
      {dispBadges?.map((e, index) => (
        <div
          key={index}
          className={`badge ${
            e.category === "likes" ? "pnp-badge-white" : "pnp-badge-black"
          } text-base`}
        >
          {getIcon(e)}
          {e}
        </div>
      ))}
      {details?.length > dispBadges.length ? (
        <div className="badge pnp-badge-white text-base">
          +{details?.length - dispBadges.length}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardBadges;
