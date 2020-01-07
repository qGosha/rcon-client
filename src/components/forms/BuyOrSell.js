import React from "react";

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

export const BuyOrSell = () => {
  const classes = useStyles();
  const data = [
    {
      title: "Buy",
      to: "/dashboard/order/step2/buy"
    },
    { title: "Sell", to: "/dashboard/order/step2/sell" }
  ];
  return (
    <Grid container className={classes.root}>
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
