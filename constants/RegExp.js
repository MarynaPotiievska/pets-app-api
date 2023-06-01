const namePattern = /^[A-Z][a-z]+$/;
const datePattern = /^\d{2}.\d{2}.\d{4}$/;
const breedPattern = /^[a-zA-Z ]+$/;
const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
const phonePattern = /^[+]380?[-\s]?([5|6|9][0|3|5|6|8|9])?[-.\s]?[0-9]{7}$/;
const passwordPattern =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z[:punct:]]+$/;
const locationPattern = /^[A-Z][a-z]+$/;

module.exports = {
  namePattern,
  datePattern,
  breedPattern,
  emailPattern,
  phonePattern,
  passwordPattern,
  locationPattern,
};
