const validateEmailFormat = (email) => {
  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const result = { isValid: true, errorMessage: '' };
  if (email === '') {
    result.isValid = false;
    result.errorMessage = 'Email cannot be empty';
  } else if (!email.match(mailFormat)) {
    result.isValid = false;
    result.errorMessage = 'Please enter a valid email. For example sam@domain.com';
  }
  return result;
};

export default validateEmailFormat;
