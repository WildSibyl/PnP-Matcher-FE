const API_URL = import.meta.env.VITE_APP_PNP_MATCHER_API_URL;

if (!API_URL) throw new Error("API URL is needed on the .env");

const baseURL = `${API_URL}/users`;

export const getFilteredUsers = async (radius, filters = {}) => {
  const res = await fetch(`${baseURL}?radius=${radius * 1000}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error ||
        errorData.message ||
        "An error occurred while fetching users"
    );
  }

  const data = await res.json();
  return data;
};
