import { useState } from "react";

const AiTextSuggest = () => {
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
          prompt: "short, cool tagline",
        }),
      });

      const data = await response.json(); // Convert to JSON
      console.log("AI data", data);
      const result = data.suggestion;
      setSuggestion(result);
    } catch (error) {
      console.error("Error:", error);
      setSuggestion("The Error Hunters");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow">
      <button
        onClick={fetchSuggestion}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
      >
        Generate Text
      </button>
      {loading && <p>Loading...</p>}
      {suggestion && <p className="mt-4 text-xl italic">💡 {suggestion}</p>}
    </div>
  );
};

export default AiTextSuggest;
