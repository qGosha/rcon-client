import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";

import { logout } from "src/actions/User";

import Container from "@material-ui/core/Container";

import { DashboardMenu } from "src/components/shared/DashboardMenu";
import { OrderForm } from "src/components/client/OrderForm";
import { Orders } from "src/components/client/Orders";
import { Profile } from "src/components/shared/forms/Profile";
import { RealtorSearch } from "src/components/realtor/RealtorSearch";
import { ClientOrdersSearch } from "src/components/realtor/ClientOrdersSearch";
import { RealtorProfileForm } from "src/components/realtor/RealtorProfileForm";
import { RespondedOrders } from "src/components/realtor/RespondedOrders";

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
        <Route
          path={`${match.url}/realtor_profile`}
          component={RealtorProfileForm}
        />
        <Route
          path={`${match.url}/client_orders`}
          component={ClientOrdersSearch}
        />
        <Route
          path={`${match.url}/responded_orders`}
          component={RespondedOrders}
        />
      </Switch>
    </Container>
  );
};

DashboardComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export const Dashboard = connect(null, { logout })(DashboardComponent);
