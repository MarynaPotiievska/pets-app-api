const patterns = require("../constants/RegExp");

const validateData = {
  validateName(name) {
    return patterns.namePattern.test(name);
  },

  validateDate(date) {
    return patterns.datePattern.test(date);
  },

  validateBreed(breed) {
    return patterns.breedPattern.test(breed);
  },

  validateEmail(email) {
    return patterns.emailPattern.test(email);
  },

  validatePhone(phone) {
    return patterns.phonePattern.test(phone);
  },

  validatePassword(password) {
    return patterns.passwordPattern.test(password);
  },

  validateLocatione(location) {
    return patterns.locationPattern.test(location);
  },
};

module.exports = validateData;
