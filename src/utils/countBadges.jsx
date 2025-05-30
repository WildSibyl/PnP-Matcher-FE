const countBadges = (details) => {
  if (!details || typeof details !== "object") return 0;
  const getLength = (arr) => (Array.isArray(arr) ? arr.length : 0);

  let filterCount = 0;
  filterCount =
    getLength(details.systems) +
    getLength(details.playstyles) +
    getLength(details.likes) +
    getLength(details.dislikes);

  return parseInt(filterCount);
};
export default countBadges;
