import { connect } from "react-redux";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { checkLoggedIn } from "src/actions/User";

import { Login } from "src/components/auth/Login";
import { Signup } from "src/components/auth/Signup";

const App = ({ checkLoggedIn, loggedIn, initialLoading }) => {
  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  if (initialLoading) return null;
  const Dashboard = () => "Dashboard";
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={loggedIn ? Dashboard : Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/smth" component={() => "Somethong"} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  initialLoading: state.auth.initialLoading
});

App.propTypes = {
  checkLoggedIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  initialLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { checkLoggedIn })(App);
