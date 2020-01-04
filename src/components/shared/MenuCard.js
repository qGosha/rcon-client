import React from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { RouterLink } from "src/components/shared/RouterLink";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    // borderRadius: 0,
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center"
  },
  icon: {
    height: 60,
    width: 60
  }
}));

export const MenuCard = ({ title, icon: Icon, to }) => {
  const classes = useStyles();
  return (
    <Grid item>
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
  );
};

MenuCard.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.element
};
