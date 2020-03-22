import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";

import { RealtorProfileFormLayout } from "src/components/forms/RealtorProfileFormLayout";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  }
}));

export const RealtorProfileForm = ({ match }) => {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate onSubmit={() => {}}>
      <Switch>
        <Route
          exact
          path={`${match.url}/`}
          component={RealtorProfileFormLayout}
        />
        <Route
          path={`${match.url}/edit`}
          component={RealtorProfileFormLayout}
        />
      </Switch>
    </form>
  );
};

RealtorProfileForm.propTypes = {
  match: PropTypes.object.isRequired
};
