import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Route, Switch, Redirect } from "react-router-dom";

import { BuyOrSell } from "src/components/forms/BuyOrSell";
import { FormLayout } from "src/components/forms/FormLayout";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  }
}));

export const OrderForm = ({ match }) => {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate onSubmit={() => {}}>
      <Switch>
        <Redirect exact to={`${match.url}/step1`} from={match.url} />
        <Route path={`${match.url}/step1`} component={BuyOrSell} />
        <Route path={`${match.url}/step2/:type`} component={FormLayout} />
      </Switch>
    </form>
  );
};

OrderForm.propTypes = {
  match: PropTypes.object.isRequired
};
