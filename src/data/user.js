const API_URL = import.meta.env.VITE_APP_PLOT_HOOK_API_URL;

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

  const res = await fetch(`${baseURL}?radius=${radius}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cleanFilters),
  });
  //console.log(`Fetching users with radius: ${radius} m and filters:`,cleanFilters);

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

//for RollForGroup
export const getRollMatches = async (radius) => {
  const res = await fetch(`${baseURL}/matches?radius=${radius}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //console.log(`Rolling users with radius: ${radius} m`);

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

export const getUserById = async (userId) => {
  const res = await fetch(`${baseURL}/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error || "An error occurred while fetching user data"
    );
  }

  const data = await res.json();
  return data;
};

export const sendInvite = async (invitedUserId, groupId) => {
  const formData = {
    invitedUserId,
    groupId,
  };

  try {
    const res = await fetch(`${baseURL}/invite`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || "An error occurred while fetching user data"
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in sendInvite:", error);
    throw error;
  }
};

export const acceptInvite = async (groupId) => {
  const formData = {
    groupId,
  };

  try {
    const res = await fetch(`${baseURL}/acceptinvite`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || "An error occurred while fetching user data"
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in acceptInvite:", err);
    throw error;
  }
};

export const rejectInvite = async (groupId) => {
  const formData = {
    groupId,
  };

  try {
    const res = await fetch(`${baseURL}/removeinvite`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || "An error occurred while fetching user data"
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in rejectInvite:", err);
    throw error;
  }
};

export const leaveGroup = async (groupId) => {
  const formData = {
    groupId,
  };

  try {
    const res = await fetch(`${baseURL}/leavegroup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || "An error occurred while fetching user data"
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in rejectInvite:", err);
    throw error;
  }
};

export const getGroupsAuthoredByMe = async () => {
  const res = await fetch(`${baseURL}/groups/authored`, {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error fetching groups");
  }

  return res.json();
};

export const getMyGroups = async () => {
  const res = await fetch(`${baseURL}/groups/`, {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error fetching groups");
  }

  return res.json();
};
