const countActiveFilters = (filters) => {
  let count = 0;

  for (const [key, value] of Object.entries(filters)) {
    if (key === "radius" && typeof value === "number" && value > 5000) {
      count++; //radius will only count as a filter if it is bigger than 5km
    } else if (Array.isArray(value) && value.length > 0) {
      count += value.length; //if entry is an array, how long is it?
    } else if (typeof value === "string" && value.trim() !== "") {
      count++; //if it's just a (not empty) string count it as 1
    } else if (typeof value === "number" && value !== 0 && key !== "radius") {
      count++; //if it's a number count it as 1
    }
  }

  return count;
};

export default countActiveFilters;
