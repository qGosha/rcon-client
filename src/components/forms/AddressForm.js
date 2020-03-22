import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { states } from "src/components/constants/states";

export const AddressForm = ({
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
}) => {
  return (
    <>
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
    </>
  );
};

AddressForm.propTypes = {
  setStreet: PropTypes.func.isRequired,
  setTel: PropTypes.func.isRequired,
  setZip: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  street: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};
