const API_URL = import.meta.env.VITE_APP_PNP_MATCHER_API_URL;

if (!API_URL) throw new Error("API URL is needed on the .env");

const baseURL = `${API_URL}/users`;

export const getUsers = async (radius) => {
  const res = await fetch(`${baseURL}?radius=${radius * 1000}`);

  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(
      errorData.error || "An error occurred while fetching users"
    );
  }

  const data = res.json();
  return data;
};
