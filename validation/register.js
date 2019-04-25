const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.displayName = !isEmpty(data.displayName) ? data.displayName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password: "";
  data.passwordMatch = !isEmpty(data.passwordMatch) ? data.passwordMatch: "";

  if (Validator.isEmpty (data.displayName)) {
    errors.displayName = "Name field is required"
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.pasword = "Pasword field is required";
  }

  if (Validator.isEmpty(data.passwordMatch)) {
    errors.passwordMatch = "Confirm Password field is required";
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = "Password must be at least 6 characters and less that 30";
  }

  if (!Validator.equals(data.password, data.passwordMatch)) {
    errors.passwordMatch = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
