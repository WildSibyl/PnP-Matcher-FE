//Get the API URL from .env
const API_URL = import.meta.env.VITE_APP_PLOT_HOOK_API_URL;

if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");

const baseURL = `${API_URL}/ai`;

export const fetchAiSuggestion = async (prompt) => {
  console.log(`Start fetching on ${API_URL}/suggest`);
  const res = await fetch(`${baseURL}/suggest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      prompt: `${prompt}`,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("AI error response:", errorData);

    if (!errorData.error) {
      throw new Error("An error occurred while generating an AI suggestion");
    }

    throw new Error(errorData.error);
  }

  const data = await res.json();
  console.log("Ai data:", data);
  return data.suggestion;
};
