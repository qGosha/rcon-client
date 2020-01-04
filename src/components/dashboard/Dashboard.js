import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { logout } from "src/actions/User";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { DashboardMenu } from "src/components/shared/DashboardMenu";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2)
  }
}));

const DashboardComponent = ({ logout }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <DashboardMenu />
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
  logout: PropTypes.func.isRequired
};

export const Dashboard = connect(null, { logout })(DashboardComponent);
