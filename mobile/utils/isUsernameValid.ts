export const isUsernameValid = (username: string | undefined) => {
  if (!username) {
    return {
      isValid: false,
      message: "Name is required",
    };
  }

  if (username.length < 3) {
    return {
      isValid: false,
      message: "Name must be at least 3 characters long",
    };
  }

  if (username.length > 20) {
    return {
      isValid: false,
      message: "Name must be at most 20 characters long",
    };
  }

  if (username.includes(" ")) {
    return {
      isValid: false,
      message: "Name cannot contain spaces",
    };
  }

  if (username.includes(".")) {
    return {
      isValid: false,
      message: "Name cannot contain '.'",
    };
  }

  if (/\d/.test(username)) {
    return {
      isValid: false,
      message: "Name cannot contain numbers",
    };
  }

  return {
    isValid: true,
    message: undefined,
  };
};
