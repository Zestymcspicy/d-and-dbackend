const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.displayName = !isEmpty(data.displayName) ? data.displayName : "";
  data.password = !isEmpty(data.password) ? data.password: "";

  if (Validator.isEmpty (data.displayName)) {
    errors.name = "Name field is required"
  }

  if (Validator.isEmpty(data.password)) {
    errors.pasword = "Pasword field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
