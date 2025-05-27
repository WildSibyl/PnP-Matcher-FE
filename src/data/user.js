const API_URL = import.meta.env.VITE_APP_PNP_MATCHER_API_URL;

if (!API_URL) throw new Error("API URL is needed on the .env");

const baseURL = `${API_URL}/users`;

export const getFilteredUsers = async (radius, filters = {}) => {
  // Remove empty arrays and empty strings from filters
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => {
      if (Array.isArray(v)) return v.length > 0;
      return v !== "" && v != null;
    })
  );

  const res = await fetch(`${baseURL}?radius=${radius * 1000}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cleanFilters),
  });
  console.log(
    `Fetching users with radius: ${radius} km and filters:`,
    cleanFilters
  );

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

// not the same url, but related to user data
export const checkUsername = async (username) => {
  const res = await fetch(`${API_URL}/check-username?username=${username}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error || "An error occurred while checking username"
    );
  }

  const data = await res.json();
  return data.isAvailable;
};
