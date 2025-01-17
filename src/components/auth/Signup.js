import { connect } from "react-redux";
import React, { useState } from "react";
import PropTypes from "prop-types";

import { signup } from "src/actions/User";
import { RouterLink } from "src/components/shared/RouterLink";
import { SimpleErrorsList } from "src/components/shared/Errors";
import { validate } from "src/utils/validation";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  loading: {
    color: "green"
  },
  errors: {
    marginTop: theme.spacing(2)
  },
  main: {
    paddingBottom: theme.spacing(2)
  }
}));

const SignupComponent = ({ signup, authOrSignupLoading, signupErrors }) => {
  const signupUser = e => {
    e.preventDefault();
    if (
      !validate(
        [
          "email",
          "password",
          "role",
          "confirmPassword",
          "lastName",
          "firstName"
        ],
        { email, password, role, confirmPassword, lastName, firstName },
        setErrors
      )
    ) {
      signup({
        email,
        password,
        role,
        password_confirmation: confirmPassword,
        first_name: firstName,
        last_name: lastName
      });
    }
  };

  const classes = useStyles();
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    role: false
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={signupUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label={role === "realtor" ? "First Name" : "Your name"}
                name="first_name"
                autoComplete="first_name"
                value={firstName}
                error={!!errors.firstName}
                onChange={({ target }) => setFirstName(target.value)}
              />
            </Grid>
            {role === "realtor" && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="last_name"
                  value={lastName}
                  error={!!errors.lastName}
                  onChange={({ target }) => setLastName(target.value)}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                error={!!errors.email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                error={!!errors.password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                error={!!errors.password}
                onChange={({ target }) => setConfirmPassword(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">I am a *:</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role1"
                value={role}
                onChange={({ target }) => setRole(target.value)}
              >
                <FormControlLabel
                  value={"client"}
                  control={<Radio />}
                  label="Homebuyer/Homeowner"
                />
                <FormControlLabel
                  value={"realtor"}
                  control={<Radio />}
                  label="Real estate agent"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={authOrSignupLoading}
          >
            {authOrSignupLoading ? (
              <CircularProgress className={classes.loading} size={24} />
            ) : (
              "Sign Up"
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <Grid container className={classes.errors}>
          <SimpleErrorsList errors={{ ...errors, ...signupErrors }} />
        </Grid>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  authOrSignupLoading: state.auth.authOrSignupLoading,
  signupErrors: state.auth.signupErrors
});

SignupComponent.propTypes = {
  authOrSignupLoading: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
  signupErrors: PropTypes.object.isRequired
};

export const Signup = connect(mapStateToProps, { signup })(SignupComponent);
