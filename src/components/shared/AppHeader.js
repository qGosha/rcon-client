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
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import history from "src/utils/history";
import { routingData } from "src/components/constants/routes";
import { userRoles } from "src/components/constants/roles";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#fff"
  },
  profileIcon: {
    color: "#fff",
    marginLeft: "auto",
    marginRight: theme.spacing(2)
  },
  loginLogout: {
    color: "#fff"
  }
}));

const AppHeaderComponent = ({ loggedIn, logout, user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const data =
    user.role === userRoles.CLIENT ? routingData.client : routingData.realtor;

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {loggedIn ? (
          <>
            <IconButton
              edge="start"
              onClick={e => setAnchorEl(e.currentTarget)}
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              onClick={() => history.push(`/dashboard`)}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </>
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
            <IconButton
              className={classes.profileIcon}
              onClick={() => history.push(`/dashboard/profile`)}
            >
              <PersonIcon />
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
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {data.map(routeInfo => (
          <MenuItem
            key={routeInfo.title}
            onClick={() => {
              history.push(routeInfo.to);
              setAnchorEl(null);
            }}
          >
            {routeInfo.title}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

AppHeaderComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export const AppHeader = connect(null, { logout })(AppHeaderComponent);
