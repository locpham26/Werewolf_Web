const validatePasswordFormat = (password) => {
  const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
  const result = { isValid: true, errorMessage: '' };
  if (password === '') {
    result.isValid = false;
    result.errorMessage = 'Password cannot be empty.';
  } else if (!password.match(passwordFormat)) {
    result.isValid = false;
    result.errorMessage = 'Password must be between 6 and 15 characters and contain at least one numeric digit, one uppercase and one lowercase letter.';
  }
  return result;
};

export default validatePasswordFormat;
