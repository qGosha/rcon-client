import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loadOrders, deleteOrder } from "src/actions/Orders";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import { Order } from "src/components/shared/Order";
import { RouterLink } from "src/components/shared/RouterLink";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const OrdersComponent = ({
  orders,
  loadOrders,
  ordersHaveBeenLoaded,
  deleteOrder
}) => {
  useEffect(() => {
    if (!ordersHaveBeenLoaded) loadOrders();
  }, [loadOrders, ordersHaveBeenLoaded]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e, _) => {
    setAnchorEl(e.currentTarget);
  };

  const menuItems = order => {
    return (
      <div>
        <MenuItem
          component={RouterLink}
          to={`/dashboard/order/edit/step1/${order.id}`}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteOrder(order.id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </div>
    );
  };

  return (
    <Grid container spacing={1} className={classes.root}>
      {orders.map(order => (
        <Order
          key={order.id}
          order={order}
          menuItems={menuItems(order)}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        />
      ))}
    </Grid>
  );
};

OrdersComponent.propTypes = {
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  ordersHaveBeenLoaded: PropTypes.bool.isRequired,
  loadOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.orders.items,
  loading: state.orders.loading,
  ordersHaveBeenLoaded: state.orders.ordersHaveBeenLoaded
});

export const Orders = connect(mapStateToProps, { loadOrders, deleteOrder })(
  OrdersComponent
);
