const API_URL = import.meta.env.VITE_APP_PNP_MATCHER_API_URL;

if (!API_URL) {
  throw new Error("API URL is required, are you missing a .env file?");
}

const baseUrl = `${API_URL}/auth`;

//get user info sent back from the server
export const me = async () => {
  const res = await fetch(`${baseUrl}/me`, {
    credentials: "include", // Always include credentials for cookie-based authentication in BE
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing in");
  }

  const data = await res.json();

  return data;
};

export const signUp = async (formData) => {
  console.log("signup hit");
  console.log("baseUrl", baseUrl);
  console.log("formData", formData);
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing up");
  }

  const data = await res.json();

  return data;
};

export const signIn = async (formData) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include", // Always include credentials for cookie-based authentication in BE
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing in");
  }

  const data = await res.json();

  return data;
};

export const signOut = async () => {
  const res = await fetch(`${baseUrl}/signout`, {
    method: "DELETE",
    credentials: "include", // Always include credentials for cookie-based authentication in BE
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing in");
  }

  const data = await res.json();

  return data;
};
