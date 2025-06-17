import { useState, useEffect } from "react";
import Wizardhat from "../../assets/wizardhat.svg?react";
import { useAuth } from "../../hooks/useAuth";
import { me } from "../../data/auth";

const TakeOverValues = ({ onChange, name }) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      //console.log("Group Suggestion error: No user logged in");
      return;
    }

    if (!name) {
      //console.log("Group Suggestion error: No field name passed");
      return;
    }

    const fetchUser = async () => {
      try {
        const currUser = await me();
        setUserData(currUser);
      } catch (error) {
        //console.log("Error fetching current user");
      }
    };

    if (Array.isArray(user.likes)) {
      //check do we have userdata?
      setUserData(user);
    } else {
      // if not fetch
      fetchUser();
    }
  }, [user, name]);

  const fetchSuggestion = () => {
    if (!userData || !userData[name]) return;

    setLoading(true);
    try {
      let result = userData[name];

      if (name === "address") {
        //use address or empty object as fallback
        const {
          street = "",
          houseNumber = "",
          postalCode = "",
          city = "",
        } = result || {};

        //send onChange for each address field
        onChange({
          target: {
            name: "address.street",
            value: street,
          },
        });

        onChange({
          target: {
            name: "address.houseNumber",
            value: houseNumber,
          },
        });

        onChange({
          target: {
            name: "address.postalCode",
            value: postalCode,
          },
        });

        onChange({
          target: {
            name: "address.city",
            value: city,
          },
        });

        return;
      }

      onChange({
        target: {
          name,
          value: result,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={fetchSuggestion}
        disabled={loading}
        className="box-border border-2 rounded-sm border-pnp-darkpurple p-2 pnp-shadow"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <Wizardhat />
        )}
      </button>
    </div>
  );
};

export default TakeOverValues;
