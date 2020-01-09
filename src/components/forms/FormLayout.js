import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { validate } from "src/utils/validation";
import { sendClientOrder } from "src/actions/Orders";

import { SimpleErrorsList } from "src/components/shared/Errors";

import { states } from "src/components/constants/states";

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
  }
}));

const FormLayoutComponent = ({
  user,
  sendClientOrder,
  match,
  sendClientOrderErrors
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [descr, setDescr] = useState("");
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState({
    // name: false,
    city: false,
    state: false,
    email: false
  });
  const submitOrder = e => {
    e.preventDefault();
    if (!validate(Object.keys(errors), { city, state, email }, setErrors)) {
      const fields = {
        tel,
        description: descr,
        order_type: match.params.type,
        address_attributes: {
          zip,
          city,
          state
        }
      };
      sendClientOrder(email === user.email ? fields : { ...fields, email });
    }
  };
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="name"
            name="name"
            label="Your name"
            fullWidth
            autoComplete="name"
            value={name}
            error={!!errors.name}
            onChange={({ target }) => setName(target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="tel"
            id="tel"
            name="tel"
            label="Your phone (optional)"
            fullWidth
            autoComplete="tel"
            value={tel}
            onChange={({ target }) => setTel(target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="address-level2"
            value={city}
            error={!!errors.city}
            onChange={({ target }) => setCity(target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={!!errors.state}>
            <InputLabel required id="state-label">
              State
            </InputLabel>
            <Select
              labelId="state-label"
              id="state-id"
              value={state}
              style={{ minWidth: "60px" }}
              onChange={({ target }) => setState(target.value)}
            >
              {states.map(state => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="postal-code"
            value={zip}
            onChange={({ target }) => setZip(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            label="Describe your home"
            multiline
            fullWidth
            variant="outlined"
            rows="4"
            value={descr}
            onChange={({ target }) => setDescr(target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2">
            We already have your email address, if you want to specify another
            email to receive offers from real estate agents type it below
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
        <Grid item xs={12}>
          <SimpleErrorsList errors={{ ...errors, ...sendClientOrderErrors }} />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submitOrder}
        >
          Submit
        </Button>
      </Grid>
    </Paper>
  );
};

FormLayoutComponent.propTypes = {
  user: PropTypes.object.isRequired,
  sendClientOrder: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  sendClientOrderErrors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
  sendClientOrderErrors: state.orders.sendClientOrderErrors
});

export const FormLayout = connect(mapStateToProps, { sendClientOrder })(
  FormLayoutComponent
);
