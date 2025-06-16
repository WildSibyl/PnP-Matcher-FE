import { useState, useEffect, useContext } from "react";
import getIcon from "../../utils/getIcon";
import countBadges from "../../utils/countBadges";
import { AuthContext } from "../../context/AuthContextProvider";

const CardBadges = ({ details }) => {
  const [dispBadges, setDispBadges] = useState([]);
  const badgeCount = countBadges(details);
  const { user: currentUser } = useContext(AuthContext);

  if (!details)
    return (
      <>
        <h3>Loading users</h3>
      </>
    );

  useEffect(() => {
    let badgeSelection = [];
    let maxBadges = 6;

    const pickFrom = (list, count, cat) => {
      let matches = [];
      let rest = [];

      //check matches with current user
      if (currentUser && currentUser[cat]) {
        const userValues = currentUser[cat].map((item) =>
          typeof item === "object" ? item.value : item
        );

        matches = list.filter((item) => userValues.includes(item));
        rest = list.filter((item) => !userValues.includes(item));
      } else {
        //if not logged in
        if (list.length > 0) {
          rest = list;
        } else {
          return;
        }
      }

      //If there are more elements than "count", take count elements, else take all
      const sorted = [...matches, ...rest].slice(
        0,
        Math.min(count, list.length)
      );

      const arrValues = sorted.map((s) => ({ ...s, category: cat }));
      badgeSelection.push(...arrValues);
      //substract number of taken elements from maxBadges
      maxBadges -= arrValues.length;
    };

    //Pick up to 3 Systems and Playstyles
    pickFrom(details.systems, 3, "systems");
    pickFrom(details.playstyles, 3, "playstyles");

    //Fill remaining space with likes
    pickFrom(details.likes, maxBadges, "likes");

    //set the selected badges
    setDispBadges(badgeSelection);
    //console.log("badge", badgeSelection);
  }, []);

  // //console.log("Details ", details);

  return (
    <div className="text-left">
      {dispBadges?.map((e, index) => (
        <div
          key={index}
          className={`badge mb-1 ${
            e.category === "likes" || e.category === "playstyles"
              ? "pnp-badge-white"
              : "pnp-badge-black"
          } text-base`}
        >
          {getIcon(e.value)}
          {e.value}
        </div>
      ))}
      {badgeCount > dispBadges.length ? (
        <div className="badge mb-1 pnp-badge-white text-base text-pnp-black">
          +{badgeCount - dispBadges.length}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardBadges;
