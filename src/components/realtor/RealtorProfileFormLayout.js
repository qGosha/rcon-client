import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";

import history from "src/utils/history";
import { serverAddress } from "src/utils/Api";
import { validate } from "src/utils/validation";
import {
  sendRealtorProfile,
  editRealtorProfile
} from "src/actions/RealtorProfiles";

import { SimpleErrorsList } from "src/components/shared/Errors";
import { AddressForm } from "src/components/shared/forms/AddressForm";
const standartImage = require("src/images/square-image.png");

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
    margin: theme.spacing(3, 0, 2)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  avatar: {
    height: theme.spacing(14),
    width: theme.spacing(14)
  },
  avatarBlock: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  avatarLabel: {
    marginTop: theme.spacing(1)
  },
  loading: {
    color: "green"
  }
}));

const RealtorProfileFormLayoutComponent = ({
  user,
  match,
  apiRealtorProfilesErrors,
  sendRealtorProfile,
  editRealtorProfile,
  loading
}) => {
  const isEditing = /edit/.test(match.url);

  useEffect(() => {
    if (user.realtor_profile && !isEditing) {
      history.push("/dashboard");
    }
  }, [user, isEditing]);

  const address = (isEditing && user.realtor_profile.address) || {};

  const classes = useStyles();
  const [street, setStreet] = useState((isEditing && address.street) || "");
  const [tel, setTel] = useState((isEditing && user.realtor_profile.tel) || "");
  const [zip, setZip] = useState((isEditing && address.zip) || "");
  const [state, setState] = useState((isEditing && address.state) || "");
  const [city, setCity] = useState((isEditing && address.city) || "");
  const [bio, setBio] = useState((isEditing && user.realtor_profile.bio) || "");
  const [email, setEmail] = useState(
    isEditing ? user.realtor_profile.email : user.email
  );
  const [avatar, setAvatar] = useState(null);

  const handleCapture = ({ target }) => {
    setAvatar(target.files[0]);
  };
  const [errors, setErrors] = useState({
    city: false,
    state: false,
    email: false
  });
  const addressFormProps = {
    setStreet,
    setTel,
    setZip,
    setState,
    setCity,
    street,
    city,
    tel,
    zip,
    state,
    errors
  };

  const createFrom = fields => {
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
      formData.append(
        key,
        typeof fields[key] === "object" && key !== "avatar"
          ? JSON.stringify(fields[key])
          : fields[key]
      );
    });
    return formData;
  };

  const submitRealtorProfile = e => {
    e.preventDefault();
    if (!validate(Object.keys(errors), { city, state, email }, setErrors)) {
      const fields = {
        tel,
        bio,
        address_attributes: {
          street,
          zip,
          city,
          state
        }
      };
      if (isEditing) {
        editRealtorProfile(
          createFrom({
            ...fields,
            id: user.realtor_profile.id,
            email,
            address_attributes: {
              ...fields.address_attributes,
              id: address.id
            },
            ...(avatar && { avatar })
          })
        );
      } else {
        sendRealtorProfile(
          createFrom({
            ...fields,
            email,
            ...(avatar && { avatar })
          })
        );
      }
    }
  };
  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          {isEditing ? (
            <Grid item xs={12}>
              <Typography
                component="h2"
                variant="subtitle2"
                className={classes.title}
              >
                Editing your profile
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography
                component="h2"
                variant="body1"
                className={classes.title}
              >
                Please fill out this important information about yourself:
              </Typography>
            </Grid>
          )}
          <AddressForm {...addressFormProps} />
          <Grid item xs={12}>
            <TextField
              id="bio"
              label="Your bio/work experience"
              multiline
              fullWidth
              variant="outlined"
              rows="4"
              value={bio}
              onChange={({ target }) => setBio(target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2">
              We already have your email address, if you want to specify another
              email to receive orders from clients type it below
            </Typography>
            <TextField
              className={classes.email}
              id="email"
              name="email"
              label="Your email adress"
              fullWidth
              autoComplete="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Typography variant="subtitle2">
              <em>*We will not disclose your email address</em>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.avatarBlock}>
            <Avatar
              className={classes.avatar}
              variant="square"
              alt="Avatar"
              src={
                isEditing
                  ? `${serverAddress}${user.realtor_profile.avatar}`
                  : standartImage
              }
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleCapture}
            />
            <label className={classes.avatarLabel} htmlFor="raised-button-file">
              <Button variant="outlined" component="span">
                <CloudUploadIcon />
                {isEditing ? "Change" : "Upload"}
              </Button>
            </label>
            {avatar && <p>{avatar.name}</p>}
          </Grid>
          <Grid item xs={12}>
            <SimpleErrorsList
              errors={{ ...errors, ...apiRealtorProfilesErrors }}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitRealtorProfile}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress className={classes.loading} size={24} />
            ) : (
              "Submit"
            )}
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

RealtorProfileFormLayoutComponent.propTypes = {
  user: PropTypes.object.isRequired,
  sendRealtorProfile: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  apiRealtorProfilesErrors: PropTypes.object.isRequired,
  editRealtorProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
  apiRealtorProfilesErrors: state.user.errors,
  loading: state.user.loading
});

export const RealtorProfileFormLayout = connect(mapStateToProps, {
  editRealtorProfile,
  sendRealtorProfile
})(RealtorProfileFormLayoutComponent);
