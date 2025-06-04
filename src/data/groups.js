//Get the API URL from .env
const API_URL = import.meta.env.VITE_APP_PLOT_HOOK_API_URL;

if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");

//Since all functions in this file will be sending requests /groups, we will create that as the base url.
const baseURL = `${API_URL}/groups`;

export const getGroups = async () => {
  const res = await fetch(baseURL);

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while fetching the groups");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const getSingleGroup = async (id) => {
  if (!id) {
    throw new Error("No ID provided to fetch single group");
  }

  const res = await fetch(`${baseURL}/${id}`);

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while fetching the group");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const createGroup = async (formData) => {
  const res = await fetch(`${baseURL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while creating the group");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const updateGroup = async (id, formData) => {
  console.log(id, formData);
  const res = await fetch(`${baseURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while updating the group");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const deleteGroup = async (id) => {
  //are you sure you want to delete this group?

  const res = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while deleting the group");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const getFilteredGroups = async (radius, filters = {}) => {
  // Remove empty arrays and empty strings from filters
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => {
      if (Array.isArray(v)) return v.length > 0;
      return v !== "" && v != null;
    })
  );

  const res = await fetch(`${baseURL}?radius=${radius}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cleanFilters),
  });
  console.log(
    `Fetching groups with radius: ${radius} m and filters:`,
    cleanFilters
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error ||
        errorData.message ||
        "An error occurred while fetching groups"
    );
  }

  const data = await res.json();
  return data;
};
