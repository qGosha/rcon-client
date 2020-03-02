import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

import { logout } from "src/actions/User";
import Link from "@material-ui/core/Link";
import { RouterLink, ButtonLink } from "src/components/shared/RouterLink";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";

import history from "src/utils/history";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#fff"
  },
  colorWhite: {
    color: "#fff"
  },
  loginLogout: {
    color: "#fff",
    marginLeft: "auto"
  }
}));

const AppHeaderComponent = ({ loggedIn, logout }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {loggedIn ? (
          <IconButton
            onClick={() => history.push(`/dashboard`)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
        ) : (
          <Link
            variant="h5"
            className={classes.title}
            component={RouterLink}
            to="/"
          >
            Rcon
          </Link>
        )}
        {loggedIn ? (
          <>
            <IconButton onClick={() => history.push(`/dashboard/profile`)}>
              <PersonIcon className={classes.colorWhite} />
            </IconButton>
            <Button className={classes.loginLogout} onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <ButtonLink className={classes.loginLogout} to="/login">
            Login
          </ButtonLink>
        )}
      </Toolbar>
    </AppBar>
  );
};

AppHeaderComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export const AppHeader = connect(null, { logout })(AppHeaderComponent);
