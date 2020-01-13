import { connect } from "react-redux";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { loadOrders, deleteOrder } from "src/actions/Orders";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { Order } from "src/components/shared/Order";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
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

  return (
    <Grid container spacing={1} className={classes.root}>
      {orders.map(order => (
        <Order key={order.id} order={order} deleteOrder={deleteOrder} />
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
