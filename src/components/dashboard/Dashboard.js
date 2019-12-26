import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

import { logout } from "src/actions/User";

// import { RouterLink } from "src/components/shared/RouterLink";

import Button from "@material-ui/core/Button";

const DashboardComponent = ({ logout }) => {
  return (
    <Button
      type="submit"
      // fullWidth
      variant="contained"
      color="primary"
      // className={classes.submit}
      onClick={logout}
    >
      Log out
    </Button>
  );
};

DashboardComponent.propTypes = {
  logout: PropTypes.func.isRequired
};

export const Dashboard = connect(null, { logout })(DashboardComponent);
