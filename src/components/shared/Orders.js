import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

// import Link from "@material-ui/core/Link"
// import { RouterLink, ButtonLink } from "src/components/shared/RouterLink"
import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar"
// import Toolbar from "@material-ui/core/Toolbar"
// import IconButton from "@material-ui/core/IconButton"
// import MenuIcon from "@material-ui/icons/Menu"
// import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({}));

const OrdersComponent = ({ orders }) => {
  const classes = useStyles();

  return <dev />;
};

AppHeaderComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.orders.items,
  loading: state.orders.loading
});

export const Orders = connect(mapStateToProps, null)(OrdersComponent);
