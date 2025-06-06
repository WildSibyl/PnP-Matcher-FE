import { useState, useEffect } from "react";
import Wizardhat from "../../assets/wizardhat.svg?react";

const AiTextSuggest = ({ onChange, prompt, name }) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          prompt: `${prompt}`,
        }),
      });

      const data = await response.json(); // Convert to JSON
      console.log("AI data", data);
      const result = data.suggestion;
      setSuggestion(result);
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
