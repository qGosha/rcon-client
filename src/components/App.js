import { connect } from "react-redux";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "src/utils/history";
import { checkLoggedIn } from "src/actions/User";

import { AppHeader } from "src/components/shared/AppHeader";
import { Login } from "src/components/auth/Login";
import { Signup } from "src/components/auth/Signup";
import { Dashboard } from "src/components/dashboard/Dashboard";
import { IntroPage } from "src/components/dashboard/IntroPage";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const App = ({ checkLoggedIn, loggedIn, initialLoading, user }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#393f8c"
      },
      secondary: {
        main: "#7b58a1"
      }
    },
    typography: {
      fontFamily: [
        "Raleway",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(",")
    },
    overrides: {
      MuiLink: {
        underlineHover: {
          "&:hover": {
            textDecoration: "none"
          }
        }
      }
    }
  });
  const styles = rootStyles();

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  if (initialLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <div style={styles.root}>
          <AppHeader loggedIn={loggedIn} user={user} />
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                loggedIn ? <Redirect to="/dashboard" /> : <IntroPage />
              }
            />
            <Route
              path="/dashboard"
              render={({ match }) =>
                loggedIn ? <Dashboard match={match} /> : <Redirect to="/" />
              }
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route render={() => "No match"} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const rootStyles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  }
});

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  initialLoading: state.auth.initialLoading,
  user: state.user.user
});

App.propTypes = {
  checkLoggedIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  initialLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { checkLoggedIn })(App);
