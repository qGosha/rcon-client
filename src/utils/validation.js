const VALID_EMAIL_FORMAT = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i;

export const validate = (fields, data, afterValidation) => {
  const errors = {};
  const {
    email,
    password,
    confirmPassword,
    role,
    city,
    state,
    firstName,
    lastName
  } = data;
  if (fields.includes("email") && (!email || !VALID_EMAIL_FORMAT.test(email))) {
    errors.email = "Incorrect email address";
  }
  if (fields.includes("password") && (!password || password.length < 6)) {
    errors.password = "Invalid password";
  }
  if (fields.includes("confirmPassword") && password !== confirmPassword) {
    errors.password = "Passwords must match";
  }
  if (fields.includes("role") && !role) {
    errors.role = "Select your role";
  }
  if (fields.includes("city") && !city) {
    errors.city = "Select your city";
  }
  if (fields.includes("state") && !state) {
    errors.state = "Select your state";
  }
  if (fields.includes("firstName") && !firstName) {
    errors.firstName = "Name must not be blank";
  }
  if (fields.includes("lastName") && role === "realtor" && !lastName) {
    errors.lastName = "Last name must not be blank";
  }
  afterValidation(errors);
  return !!Object.keys(errors).length;
};
