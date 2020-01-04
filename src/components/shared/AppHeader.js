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
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#fff"
  },
  link: {
    color: "#fff"
  }
}));

const AppHeaderComponent = ({ loggedIn, logout }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {loggedIn && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link
          variant="h5"
          className={classes.title}
          component={RouterLink}
          to="/"
        >
          Rcon
        </Link>
        {loggedIn ? (
          <Button className={classes.link} onClick={logout}>
            Logout
          </Button>
        ) : (
          <ButtonLink className={classes.link} to="/login">
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
