const {
  namePattern,
  datePattern,
  phonePattern,
  emailPattern,
  passwordPattern,
  locationPattern,
  breedPattern,
} = require("../constants/RegExp");

function validateName(name) {
  return namePattern.test(name);
}

function validateEmail(email) {
  return emailPattern.test(email);
}

function validateDate(date) {
  return datePattern.test(date);
}
function validateBreed(breed) {
  return breedPattern.test(breed)
}

function validatePhone(phone) {
  return phonePattern.test(phone);
}

function validateLocation(location) {
  return locationPattern.test(location);
}

function validatePassword(password) {
  return passwordPattern.test(password);
}

module.exports = {
  validateName,
  validateEmail,
  validateDate,
  validateBreed,
  validatePhone,
  validateLocation,
  validatePassword,
};