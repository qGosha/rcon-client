import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

import { logout } from "src/actions/User";

import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { House } from "src/images/house-blue";
import { useTheme } from "@material-ui/core/styles";

const useStyles = theme =>
  makeStyles({
    root: isMobile => ({
      padding: theme.spacing(isMobile ? 2 : 6),
      paddingBottom: 0,
      background: "linear-gradient(45deg, #cdd432 30%, #ff6311 90%)",
      flexGrow: 1
    }),
    innerBlock: {
      padding: theme.spacing(2),
      backgroundColor: "#fff",
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12
    },
    houseImg: {
      textAlign: "center",
      marginTop: theme.spacing(2)
    }
  });

const IntroPageComponent = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const classes = useStyles(theme)(isMobile);

  return (
    <div className={classes.root}>
      <div className={classes.innerBlock}>
        <div className={classes.houseImg}>
          <House size={isMobile ? 60 : 100} />
        </div>
        <Typography component="h1" variant="h5">
          Rcom helps to connect homebuyers and homeowners to local real estate
          agents.
        </Typography>
      </div>
    </div>
  );
};

IntroPageComponent.propTypes = {
  logout: PropTypes.func.isRequired
};

export const IntroPage = connect(null, { logout })(IntroPageComponent);
