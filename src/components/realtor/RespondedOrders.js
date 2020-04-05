import { connect } from "react-redux";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { loadRespondedOrdersList } from "src/actions/OrdersList";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { Order } from "src/components/shared/Order";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const RespondedOrdersComponent = ({
  respondedToOrders,
  loadRespondedOrdersList
}) => {
  useEffect(() => {
    loadRespondedOrdersList();
  }, [loadRespondedOrdersList]);

  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.root}>
      {respondedToOrders.map(order => (
        <Order key={order.id} order={order} />
      ))}
    </Grid>
  );
};

RespondedOrdersComponent.propTypes = {
  respondedToOrders: PropTypes.array.isRequired,
  loadRespondedOrdersList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  respondedToOrders: state.ordersList.respondedToOrders
});

export const RespondedOrders = connect(mapStateToProps, {
  loadRespondedOrdersList
})(RespondedOrdersComponent);
