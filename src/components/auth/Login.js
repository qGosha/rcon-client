import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { login } from "src/actions/User";
import { SimpleErrorsList } from "src/components/shared/Errors";
import { RouterLink } from "src/components/shared/RouterLink";
import { validate } from "src/utils/validation";
import history from "src/utils/history";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  loading: {
    color: "green"
  },
  errors: {
    marginTop: theme.spacing(2)
  }
}));

const LoginComponent = ({
  login,
  authOrSignupLoading,
  loginErrors,
  loggedIn
}) => {
  useEffect(() => {
    if (loggedIn) history.replace("/");
  }, [loggedIn]);

  const loginUser = e => {
    e.preventDefault();
    if (!validate(["email", "password"], { email, password }, setErrors)) {
      login({ email, password, remember_me: rememberMe });
    }
  };
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("0");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={loginUser}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            inputProps={{ maxLength: 75 }}
            label="Email Address"
            value={email}
            name="email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputProps={{ maxLength: 75 }}
            value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!errors.password}
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={rememberMe}
                color="primary"
                onChange={() => setRememberMe(rememberMe === "0" ? "1" : "0")}
              />
            }
            label="Remember me"
          />
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
              "Sign In"
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Grid container className={classes.errors}>
        <SimpleErrorsList errors={{ ...errors, ...loginErrors }} />
      </Grid>
    </Container>
  );
};
const mapStateToProps = state => ({
  authOrSignupLoading: state.auth.authOrSignupLoading,
  loginErrors: state.auth.loginErrors,
  loggedIn: state.auth.loggedIn
});

LoginComponent.propTypes = {
  authOrSignupLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginErrors: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export const Login = connect(mapStateToProps, { login })(LoginComponent);
