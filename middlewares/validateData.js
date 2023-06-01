const validateData = {
  validateName(name) {
    const namePattern = /^[A-Z][a-z]+$/;
    return namePattern.test(name);
  },

  validateDate(date) {
    const datePattern = /^\d{2}.\d{2}.\d{4}$/;
    return datePattern.test(date);
  },

  validateBreed(breed) {
    const breedPattern = /^[a-zA-Z ]+$/;
    return breedPattern.test(breed);
  },

  validateEmail(email) {
    const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  },

  validatePhone(phone) {
    const phonePattern =
      /^[+]380?[-\s]?([5|6|9][0|3|5|6|8|9])?[-.\s]?[0-9]{7}$/;
    return phonePattern.test(phone);
  },

  validatePassword(password) {
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_.-]+$/;
    return passwordPattern.test(password);
  },

  validateLocatione(location) {
    const locationPattern = /^[A-Z][a-z]+$/;
    return locationPattern.test(location);
  },
};

module.exports = validateData;
