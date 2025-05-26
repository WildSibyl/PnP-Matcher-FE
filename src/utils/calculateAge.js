const calculateAge = (birthdateString) => {
  const birthDate = new Date(birthdateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    //if birthday hasn't happened subtract a year
    age--;
  }
  return age;
};

export default calculateAge;
