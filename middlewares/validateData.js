const validateData = {
  validateName(name) {
    const namePattern = /^[a-zA-Z ]+$/;
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
    const passwordPattern = /^[a-zA-Z0-9]+$/;
    return passwordPattern.test(password);
  },

  validateLocatione(location) {
    const locationPattern = /^[A-Za-z\s]+,\s*[A-Za-z\s]+$/;
    return locationPattern.test(location);
  },
};

module.exports = validateData;
