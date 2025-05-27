const shortenExperienceLabel = (label) => {
  if (typeof label !== "string") return label;
  return label.split(":")[0].trim();
};

export default shortenExperienceLabel;
