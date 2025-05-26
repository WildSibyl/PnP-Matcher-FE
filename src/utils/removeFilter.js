const removeFilter = (currentFilter, valToRemove) => {
  const newFilter = { ...currentFilter };

  for (const [key, value] of Object.entries(currentFilter)) {
    if (valToRemove === "radius") {
      if (value > 5) {
        newFilter.radius = 5;
      }
    } else if (valToRemove === "age") {
      newFilter.age = "";
    } else if (valToRemove === "playMode") {
      newFilter.playMode = "";
    } else if (valToRemove === "weekdays") {
      newFilter.weekdays = [];
    } else if (Array.isArray(value)) {
      newFilter[key] = value.filter((opt) => opt !== valToRemove);
    } else {
      if (value === valToRemove) {
        newFilter[key] = "";
      }
    }
  }
  return newFilter;
};

export default removeFilter;
