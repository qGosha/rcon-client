import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";

import { logout } from "src/actions/User";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { DashboardMenu } from "src/components/shared/DashboardMenu";
import { OrderForm } from "src/components/forms/OrderForm";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2)
  }
}));

const DashboardComponent = ({ logout, match }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Switch>
        <Route exact path={`${match.url}`} component={DashboardMenu} />
        <Route path={`${match.url}/order`} component={OrderForm} />
      </Switch>
      {/* <Button
        type="submit"
        // fullWidth
        variant="contained"
        color="primary"
        // className={classes.submit}
        onClick={logout}
      >
        Log out
      </Button> */}
    </Container>
  );
};

DashboardComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export const Dashboard = connect(null, { logout })(DashboardComponent);
