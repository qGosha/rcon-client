import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { MenuCard } from "src/components/shared/MenuCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    marginTop: theme.spacing(3),
    alignItems: "center"
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  innerContainer: {
    justifyContent: "center"
  }
}));

export const BuyOrSell = ({ match }) => {
  const classes = useStyles();
  const { id } = match.params;
  const isEditing = /edit/.test(match.url) && id;
  const data = [
    {
      title: "Buy",
      to: isEditing
        ? `/dashboard/order/edit/step2/buy/${id}`
        : "/dashboard/order/step2/buy"
    },
    {
      title: "Sell",
      to: isEditing
        ? `/dashboard/order/edit/step2/sell/${id}`
        : "/dashboard/order/step2/sell"
    }
  ];
  return (
    <Grid container className={classes.root}>
      {isEditing ? (
        <Typography
          component="h2"
          variant="subtitle2"
          className={classes.title}
        >
          Editing your order
        </Typography>
      ) : null}
      <Typography component="h1" variant="h6" className={classes.title}>
        Do you want to buy or sell a house?
      </Typography>
      <Grid container spacing={5} className={classes.innerContainer}>
        {data.map((cardData, index) => (
          <MenuCard
            key={index}
            title={cardData.title}
            index={index + 1}
            to={cardData.to}
          />
        ))}
      </Grid>
    </Grid>
  );
};

BuyOrSell.propTypes = {
  match: PropTypes.object.isRequired
};
