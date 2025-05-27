const removeFilter = (currentFilter, valToRemove) => {
  const newFilter = { ...currentFilter };

  for (const [key, value] of Object.entries(currentFilter)) {
    if (valToRemove === "radius") {
      if (value > 5000) {
        newFilter.radius = 5000;
      }
    } else if (valToRemove === "age") {
      newFilter.age = "";
    } else if (valToRemove === "playingModes") {
      newFilter.playingModes = "";
    } else if (valToRemove === "weekdays") {
      newFilter.weekdays = [];
    } else if (valToRemove === "languages") {
      newFilter.languages = [];
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
