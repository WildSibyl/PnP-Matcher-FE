import { useState } from "react";

const AiTextSuggest = () => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "user",
                content:
                  "Give me one group name suggestion for a pen&paper playing group playing dark fantasy with a lot of dungeoncrawling",
              },
            ],
          }),
        }
      );

      const data = await response.json(); // Convert to JSON

      const result = data.choices[0].message.content.trim();
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
