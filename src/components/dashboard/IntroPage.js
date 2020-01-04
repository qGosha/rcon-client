import { connect } from "react-redux";
import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";

import { logout } from "src/actions/User";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

import house from "src/images/c.jpg";
import { ButtonLink } from "src/components/shared/RouterLink";

const useStyles = theme =>
  makeStyles({
    innerBlock: {
      backgroundColor: theme.palette.secondary.main,
      opacity: 0.5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flexGrow: 1,
      height: "100%"
    },
    img: {
      flexGrow: 1,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${house})`
    },
    signupButtonContainer: {
      position: "absolute",
      top: "80%",
      zIndex: 10,
      display: "flex",
      width: "100%",
      justifyContent: "center"
    },
    mainText: {
      textAlign: "center",
      color: "fff",
      position: "absolute",
      top: "30%",
      zIndex: 10,
      width: "100%"
    },
    signupButton: {
      backgroundColor: theme.palette.secondary.dark,
      color: "#fff"
    }
  });

const IntroPageComponent = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const classes = useStyles(theme)(isMobile);
  const [checked, setChecked] = useState(false);
  useLayoutEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.img}>
      <Fade in={checked} timeout={700}>
        <Typography component="h1" variant="h4" className={classes.mainText}>
          Rcom helps to connect homebuyers and homeowners to local real estate
          agents.
        </Typography>
      </Fade>
      <Fade in={checked} timeout={700}>
        <div className={classes.signupButtonContainer}>
          <ButtonLink
            className={classes.signupButton}
            to="/signup"
            size="large"
          >
            Sign up
          </ButtonLink>
        </div>
      </Fade>
      <div className={classes.innerBlock}></div>
    </div>
  );
};

IntroPageComponent.propTypes = {
  logout: PropTypes.func.isRequired
};

export const IntroPage = connect(null, { logout })(IntroPageComponent);
