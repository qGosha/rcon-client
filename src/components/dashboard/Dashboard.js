import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";

import { logout } from "src/actions/User";

import Container from "@material-ui/core/Container";

import { DashboardMenu } from "src/components/shared/DashboardMenu";
import { OrderForm } from "src/components/forms/OrderForm";
import { Orders } from "src/components/shared/Orders";
import { Profile } from "src/components/forms/Profile";
import { RealtorSearch } from "src/components/shared/RealtorSearch";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2)
  }
}));

const DashboardComponent = ({ match }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Switch>
        <Route exact path={`${match.url}`} component={DashboardMenu} />
        <Route path={`${match.url}/order`} component={OrderForm} />
        <Route path={`${match.url}/orders`} component={Orders} />
        <Route path={`${match.url}/profile`} component={Profile} />
        <Route path={`${match.url}/realtors`} component={RealtorSearch} />
      </Switch>
    </Container>
  );
};

DashboardComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export const Dashboard = connect(null, { logout })(DashboardComponent);
