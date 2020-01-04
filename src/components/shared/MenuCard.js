import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { RouterLink } from "src/components/shared/RouterLink";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";

const useStyles = isMobile =>
  makeStyles(theme => ({
    root: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(2),
      padding: isMobile ? theme.spacing(3) : theme.spacing(6),
      display: "flex",
      alignItems: "center",
      boxShadow: theme.shadows[10],
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: "#fff"
      }
    },
    icon: {
      height: 60,
      width: 60
    }
  }));

export const MenuCard = ({ title, icon: Icon, to, index }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const classes = useStyles(isMobile)();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Slide
      in={checked}
      direction={index % 2 === 0 ? "left" : "right"}
      timeout={500}
    >
      <Grid
        item
        style={
          !isMobile
            ? { alignSelf: index % 2 === 0 ? "flex-end" : "flex-start" }
            : {}
        }
      >
        <Link
          variant="h5"
          className={classes.root}
          component={RouterLink}
          to={to}
        >
          <Icon className={classes.icon} />
          {title}
        </Link>
      </Grid>
    </Slide>
  );
};

MenuCard.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.element,
  index: PropTypes.number.isRequired
};
