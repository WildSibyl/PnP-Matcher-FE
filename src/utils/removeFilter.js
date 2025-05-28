const removeFilter = (currentFilter, valToRemove, key) => {
  const newFilter = { ...currentFilter };

  for (const [key, value] of Object.entries(currentFilter)) {
    if (valToRemove === "radius") {
      if (value > 5000) {
        newFilter.radius = 5000;
      }
    } else if (key === "age") {
      newFilter.age = "";
    } else if (key === "playingModes") {
      newFilter.playingModes = "";
    } else if (key === "weekdays") {
      newFilter.weekdays = [];
    } else if (key === "languages") {
      newFilter.languages = [];
    } else if (
      key === "languages" ||
      key === "systems" ||
      key === "experience" ||
      key === "playstyles" ||
      key === "likes" ||
      key === "dislikes"
    ) {
      newFilter[key] = newFilter[key].filter((opt) => {
        if (typeof valToRemove === "object" && valToRemove?.value) {
          return opt.value !== valToRemove.value;
        }
        return opt !== valToRemove;
      });
    } else if (key === "frequencyPerMonth") {
      newFilter.frequencyPerMonth = 0;
    } else {
      if (newFilter[key] === valToRemove) {
        newFilter[key] = "";
      }
    }
  }
  return newFilter;
};

export default removeFilter;
