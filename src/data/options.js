//Get the API URL from .env
const API_URL = import.meta.env.VITE_APP_PLOT_HOOK_API_URL;

if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");

//Since all functions in this file will be sending requests /options, we will create that as the base url.
const baseURL = `${API_URL}/options`;

export const getOptions = async () => {
  const res = await fetch(baseURL);

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while fetching the options");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const getOptionsByCategory = async (category) => {
  if (!category) throw new Error("Category is required");

  const allOptions = await getOptions(); // calls the above
  return allOptions.filter((opt) => opt.category === category);
};

// export const getSingleOption = async (id) => {
//   const res = await fetch(`${baseURL}/${id}`);

//   if (!res.ok) {
//     const errorData = await res.json();

//     if (!errorData.error) {
//       throw new Error("An error occurred while fetching the option");
//     }
//     throw new Error(errorData.error);
//   }

//   const data = await res.json();
//   return data;
// };

// export const createOption = async (formData) => {
//   const res = await fetch(baseURL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//     credentials: "include",
//   });

//   if (!res.ok) {
//     const errorData = await res.json();

//     if (!errorData.error) {
//       throw new Error("An error occurred while creating the option");
//     }
//     throw new Error(errorData.error);
//   }

//   const data = await res.json();
//   return data;
// };

// export const updateOption = async (id, formData) => {
//   //console.log(id, formData);
//   const res = await fetch(`${baseURL}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//     credentials: "include",
//   });

//   if (!res.ok) {
//     const errorData = await res.json();

//     if (!errorData.error) {
//       throw new Error("An error occurred while updating the option");
//     }
//     throw new Error(errorData.error);
//   }

//   const data = await res.json();
//   return data;
// };

// export const deleteOption = async (id) => {
//   //are you sure you want to delete this option?

//   const res = await fetch(`${baseURL}/${id}`, {
//     method: "DELETE",
//     credentials: "include",
//   });

//   if (!res.ok) {
//     const errorData = await res.json();

//     if (!errorData.error) {
//       throw new Error("An error occurred while deleting the option");
//     }
//     throw new Error(errorData.error);
//   }

//   const data = await res.json();
//   return data;
// };
