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
import { sendClientOrder, editClientOrder } from "src/actions/Orders";

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
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

const FormLayoutComponent = ({
  user,
  sendClientOrder,
  match,
  apiClientOrderErrors,
  orders,
  editClientOrder
}) => {
  const { id, type } = match.params;
  const isEditing = /edit/.test(match.url) && id;

  const order =
    (isEditing && orders.find(order => order.id === parseInt(id))) || {};

  const classes = useStyles();
  const [street, setStreet] = useState(isEditing ? order.address.street : "");
  const [tel, setTel] = useState(isEditing ? order.tel : "");
  const [zip, setZip] = useState(isEditing ? order.address.zip : "");
  const [state, setState] = useState(isEditing ? order.address.state : "");
  const [city, setCity] = useState(isEditing ? order.address.city : "");
  const [descr, setDescr] = useState(isEditing ? order.description : "");
  const [email, setEmail] = useState(isEditing ? order.email : user.email);

  const [errors, setErrors] = useState({
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
        order_type: type === "sell" ? 1 : 0,
        address_attributes: {
          street,
          zip,
          city,
          state
        }
      };
      if (isEditing) {
        editClientOrder({
          ...fields,
          id,
          email,
          address_attributes: {
            ...fields.address_attributes,
            id: order.address.id
          }
        });
      } else {
        sendClientOrder({ ...fields, email });
      }
    }
  };
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        {isEditing ? (
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="subtitle2"
              className={classes.title}
            >
              Editing your order
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={6}>
          <TextField
            id="street"
            name="street"
            label="Street (optional)"
            fullWidth
            autoComplete="address-line-1"
            value={street}
            onChange={({ target }) => setStreet(target.value)}
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
          <SimpleErrorsList errors={{ ...errors, ...apiClientOrderErrors }} />
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
  apiClientOrderErrors: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  editClientOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
  apiClientOrderErrors: state.orders.apiClientOrderErrors,
  orders: state.orders.items
});

export const FormLayout = connect(mapStateToProps, {
  sendClientOrder,
  editClientOrder
})(FormLayoutComponent);
