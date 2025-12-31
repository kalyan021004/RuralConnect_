export const checkEligibility = (user, scheme) => {
  const { eligibility } = scheme;

  // AGE CHECK
  if (user.dateOfBirth) {
    const age =
      new Date().getFullYear() -
      new Date(user.dateOfBirth).getFullYear();

    if (age < eligibility.minAge || age > eligibility.maxAge) {
      return {
        eligible: false,
        reason: "Age not eligible for this scheme"
      };
    }
  }

  // GENDER CHECK
  if (
    eligibility.gender &&
    !eligibility.gender.includes(user.gender)
  ) {
    return {
      eligible: false,
      reason: "Gender not eligible for this scheme"
    };
  }

  // CATEGORY CHECK
  if (
    eligibility.category &&
    !eligibility.category.includes(user.category)
  ) {
    return {
      eligible: false,
      reason: "Category not eligible for this scheme"
    };
  }

  return {
    eligible: true
  };
};
