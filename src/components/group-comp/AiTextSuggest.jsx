import { useState, useEffect } from "react";
import Wizardhat from "../../assets/wizardhat.svg?react";
import { fetchAiSuggestion } from "../../data/ai.js";

const AiTextSuggest = ({ onChange, prompt, name, length }) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async () => {
    setLoading(true);

    try {
      const result = await fetchAiSuggestion(prompt);
      let newSuggestion;

      if (typeof length === "number" && length > 0) {
        if (result.length > length) {
          newSuggestion = result.slice(0, length - 3) + "...";
        } else {
          newSuggestion = result;
        }
      } else {
        newSuggestion = result;
      }

      setSuggestion(newSuggestion);
      onChange({
        target: {
          name: name,
          value: result,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      setSuggestion("The Error Hunters");
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={fetchSuggestion}
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

export default AiTextSuggest;
