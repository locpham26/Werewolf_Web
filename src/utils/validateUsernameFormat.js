const validateUsernameFormat = (username) => {
  const usernameFormat = /^[a-zA-Z0-9].{3,12}$/;
  const result = { isValid: true, errorMessage: '' };
  if (username === '') {
    result.isValid = false;
    result.errorMessage = 'Username cannot be empty.';
  } else if (!username.match(usernameFormat)) {
    result.isValid = false;
    result.errorMessage = 'Username must be between 3 and 12 characters';
  }
  return result;
};

export default validateUsernameFormat;
