import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { validate } from "src/utils/validation";
import { SimpleErrorsList } from "src/components/shared/Errors";
import { updateUser } from "src/actions/User";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  innerContainer: {
    justifyContent: "center"
  },
  email: {
    margin: `${theme.spacing(1)} 0`
  },
  submit: {
    margin: theme.spacing(3, 1, 2)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  buttonsBlock: {
    display: "flex",
    justifyContent: "flex-end"
  },
  editButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: "50%",
    transform: "translateY(-50%)"
  },
  gridItem: {
    position: "relative"
  }
}));
const defaultEditFields = {
  email: false,
  firstName: false,
  lastName: false,
  password: false,
  confirmPassword: false
};

const ProfileComponent = ({ user, userErrors, updateUser }) => {
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editFields, setEditFields] = useState(defaultEditFields);
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  const classes = useStyles();
  const submitForm = e => {
    e.preventDefault();
    if (
      !validate(
        Object.keys(editFields).filter(f => editFields[f]),
        { email, password, confirmPassword, firstName },
        setErrors
      )
    ) {
      updateUser({
        id: user.id,
        email,
        password,
        password_confirmation: confirmPassword,
        first_name: firstName,
        last_name: lastName
      });
    }
    setEditFields(defaultEditFields);
  };
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.gridItem}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoComplete="first_name"
            value={firstName}
            error={!!errors.firstName}
            onChange={({ target }) => setFirstName(target.value)}
            disabled={!editFields.firstName}
          />
          <Button
            className={classes.editButton}
            onClick={() =>
              setEditFields({ ...editFields, firstName: !editFields.firstName })
            }
          >
            <Typography variant="caption">
              {editFields.firstName ? "Disable" : "Edit"}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
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
            disabled={!editFields.lastName}
          />
          <Button
            className={classes.editButton}
            onClick={() =>
              setEditFields({ ...editFields, lastName: !editFields.lastName })
            }
          >
            <Typography variant="caption">
              {editFields.lastName ? "Disable" : "Edit"}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <TextField
            className={classes.email}
            id="email"
            name="email"
            label="Your email adress"
            fullWidth
            autoComplete="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            disabled={!editFields.email}
          />
          <Button
            className={classes.editButton}
            onClick={() =>
              setEditFields({ ...editFields, email: !editFields.email })
            }
          >
            <Typography variant="caption">
              {editFields.email ? "Disable" : "Edit"}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
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
            disabled={!editFields.password}
          />
          <Button
            className={classes.editButton}
            onClick={() =>
              setEditFields({
                ...editFields,
                password: !editFields.password,
                confirmPassword: !editFields.confirmPassword
              })
            }
          >
            <Typography variant="caption">
              {editFields.password ? "Disable" : "Edit"}
            </Typography>
          </Button>
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
            disabled={!editFields.password}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleErrorsList errors={{ ...errors, ...userErrors }} />
        </Grid>
        <Grid item xs={12} className={classes.buttonsBlock}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
            disabled={Object.keys(editFields).every(f => !editFields[f])}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProfileComponent.propTypes = {
  user: PropTypes.object.isRequired,
  userErrors: PropTypes.object,
  updateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
  userErrors: state.user.errors
});

export const Profile = connect(mapStateToProps, { updateUser })(
  ProfileComponent
);
