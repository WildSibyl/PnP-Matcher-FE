const API_URL = import.meta.env.VITE_APP_PNP_MATCHER_API_URL;

if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");

//Since all functions in this file will be sending requests /chats, we will create that as the base url.
const baseURL = `${API_URL}/chats`;

export const getChats = async () => {
  const res = await fetch(baseURL);

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while fetching the chats");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const getChatMessages = async () => {
  const res = await fetch(`${baseURL}`, {
    credentials: "include", // crucial for auth cookies
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || "Failed to fetch messages");
  }

  return res.json();
};

// export const getMessagesByUser = async (userId) => {
//   const res = await fetch(`${API_URL}/chats/user/${userId}`, {
//     credentials: "include",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch messages");
//   }

//   return res.json();
// };

export const getSingleChat = async (id) => {
  const res = await fetch(`${baseURL}/${id}`);

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while fetching the chat");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const sendChat = async (chatData) => {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chatData),
    credentials: "include",
  });

  console.log("Sending chat data:", chatData);

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while creating the chat");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const updateChat = async (id, chatData) => {
  console.log(id, chatData);
  const res = await fetch(`${baseURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chatData),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while updating the chat");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const deleteChat = async (id) => {
  //are you sure you want to delete this chat?

  const res = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while deleting the chat");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};
