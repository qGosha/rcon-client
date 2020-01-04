import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { MenuCard } from "src/components/shared/MenuCard";

export const userRoles = {
  CLIENT: "client",
  REALTOR: "realtor"
};

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    marginTop: theme.spacing(3)
  }
}));

const DashboardMenuComponent = ({ user }) => {
  let data = [];
  const classes = useStyles();

  if (user.role === userRoles.CLIENT) {
    data = [
      {
        title: "Fill out the form",
        icon: FormatIndentIncreaseIcon,
        onClick: () => {},
        to: "/dashboard/order"
      },
      { title: "Search an agent", icon: SearchIcon, onClick: () => {} },
      { title: "See my orders", icon: ListIcon, onClick: () => {} }
    ];
  } else {
    data = [
      {
        title: "Fill out the form",
        icon: FormatIndentIncreaseIcon,
        onClick: () => {}
      },
      { title: "Search an agent", icon: SearchIcon, onClick: () => {} }
    ];
  }
  return (
    <Grid container spacing={3} className={classes.root}>
      {data.map((cardData, index) => (
        <MenuCard
          key={index}
          title={cardData.title}
          icon={cardData.icon}
          onClick={cardData.onClick}
          index={index}
          to={cardData.to}
        />
      ))}
    </Grid>
  );
};

DashboardMenuComponent.propTypes = {
  user: PropTypes.object.isRequired
  // onClick: PropTypes.func.isRequired,
  // icon: PropTypes.element,
};

const mapStateToProps = state => ({
  user: state.user.user
});

export const DashboardMenu = connect(
  mapStateToProps,
  null
)(DashboardMenuComponent);
