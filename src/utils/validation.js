const VALID_EMAIL_FORMAT = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i;

export const validate = (fields, data, afterValidation) => {
  const errors = {};
  const { email, password, confirmPassword, role } = data;
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
  afterValidation(errors);
  return !!Object.keys(errors).length;
};
