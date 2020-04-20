import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { SELECT_ALL } from "src/components/constants/states";
import { SearchWithStateSelectForm } from "src/components/shared/forms/SearchWithStateSelectForm";
import { fetchClientOrdersList } from "src/actions/OrdersList";
import { mailRealtorProfile } from "src/actions/RealtorProfiles";
import { Order } from "src/components/shared/Order";

const ALL = "All";
const BUYERS = "Buyers";
const SELLERS = "Sellers";

const TYPES = [ALL, BUYERS, SELLERS];

const ClientOrdersSearchComponent = ({
  user,
  fetchClientOrdersList,
  loading,
  orders,
  ordersTotal,
  respondedTo,
  mailRealtorProfile
}) => {
  const userState = user.realtor_profile.address.state;
  const [pageNum, setPageNum] = useState(1);
  const [offset, setOffset] = useState(0);
  const [isConfirmationOpen, toggleConfirmationOpen] = useState(false);
  const [state, setState] = useState(userState);
  const [type, setType] = useState(ALL);
  const [zip, setZip] = useState("");
  const [zipValidValue, setZipValidValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    setActiveOrder(null);
  };

  const handleClick = (e, id) => {
    setAnchorEl(e.currentTarget);
    setActiveOrder(id);
  };

  const zipInputChange = e => {
    const { value } = e.target;
    if (!/^$|^[0-9]+$/.test(value)) return;

    setZip(value);

    if (value.length === 5 || (!value.length && zipValidValue.length === 5)) {
      setZipValidValue(value);
    }
  };
  const getNumericType = type => {
    let numericType;

    if (type === BUYERS) {
      numericType = "0";
    } else if (type === SELLERS) {
      numericType = "1";
    }
    return numericType;
  };

  useEffect(() => {
    setPageNum(1);
    setOffset(0);
  }, [state, zipValidValue, type]);

  useEffect(() => {
    fetchClientOrdersList({
      page: pageNum,
      per_page: 9,
      state: state === SELECT_ALL ? null : state,
      type: getNumericType(type),
      zip: zipValidValue
    });
  }, [state, fetchClientOrdersList, type, pageNum, zipValidValue]);

  useEffect(() => {
    setZip("");
    setZipValidValue(null);
  }, [state]);

  const menuItems = _ => {
    return (
      <div>
        <MenuItem onClick={() => toggleConfirmationOpen(true)}>
          Respond to this order
        </MenuItem>
      </div>
    );
  };

  const respondedToSign = (
    <div title="You've already responded to this order">
      <CheckCircleIcon style={{ color: "green" }} />
    </div>
  );

  return (
    <Grid container spacing={1} styles={{ justifyContent: "flex-start" }}>
      <SearchWithStateSelectForm
        offset={offset}
        total={ordersTotal}
        setPageNum={setPageNum}
        setOffset={setOffset}
        setState={setState}
        state={state}
      />
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel required id="state-label">
            Filter by type
          </InputLabel>
          <Select
            labelId="type-label"
            id="type-id"
            value={type}
            style={{ minWidth: "60px" }}
            onChange={({ target }) => setType(target.value)}
          >
            {TYPES.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Zip code"
          value={zip}
          variant="outlined"
          inputProps={{ maxLength: "5" }}
          onChange={zipInputChange}
        />
      </Grid>
      {!loading &&
        orders.map(order => (
          <Order
            key={order.id}
            order={order}
            menuItems={
              (!respondedTo.includes(order.id) && menuItems(order)) || undefined
            }
            icon={respondedTo.includes(order.id) && respondedToSign}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
          />
        ))}
      <Dialog
        open={isConfirmationOpen}
        onClose={() => toggleConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Respond to the order"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to reply to this order with your profile? This will send
            all your profile impormation to the order&apos;s owner.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              toggleConfirmationOpen(false);
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              mailRealtorProfile({ order_id: activeOrder });
              toggleConfirmationOpen(false);
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

ClientOrdersSearchComponent.propTypes = {
  user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  ordersTotal: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchClientOrdersList: PropTypes.func.isRequired,
  respondedTo: PropTypes.array.isRequired,
  mailRealtorProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
  orders: state.ordersList.items,
  ordersTotal: state.ordersList.ordersTotal,
  loading: state.ordersList.loading,
  respondedTo: state.ordersList.respondedTo
});

export const ClientOrdersSearch = connect(mapStateToProps, {
  fetchClientOrdersList,
  mailRealtorProfile
})(ClientOrdersSearchComponent);
