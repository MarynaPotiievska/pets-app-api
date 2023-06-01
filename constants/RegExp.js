const namePattern = /^[a-zA-Z ]+$/;
const datePattern = /^\d{2}.\d{2}.\d{4}$/;
const breedPattern = /^[a-zA-Z ]+$/;
const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
const phonePattern = /^[+]380?[-\s]?([5|6|9][0|3|5|6|8|9])?[-.\s]?[0-9]{7}$/;
const passwordPattern = /^[a-zA-Z0-9[:punct:]]+$/;
const locationPattern = /^[A-Za-z\s]+$/;

module.exports = {
  namePattern,
  datePattern,
  breedPattern,
  emailPattern,
  phonePattern,
  passwordPattern,
  locationPattern,
};
