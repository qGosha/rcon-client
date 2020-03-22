import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { MenuCard } from "src/components/shared/MenuCard";
import { userRoles } from "src/components/constants/roles";
import history from "src/utils/history";

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    marginTop: theme.spacing(3)
  }
}));

const DashboardMenuComponent = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      {user.role === userRoles.CLIENT ? (
        <ClientDashboard />
      ) : (
        <RealtorDashboard user={user} />
      )}
    </Grid>
  );
};

DashboardMenuComponent.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user
});

export const DashboardMenu = connect(
  mapStateToProps,
  null
)(DashboardMenuComponent);

const RealtorDashboard = ({ user }) => {
  const realtorProfile = user.realtor_profile;
  useEffect(() => {
    if (!realtorProfile) {
      history.push("/dashboard/realtor_profile");
    }
  }, [realtorProfile]);

  const data = [
    { title: "Search orders", icon: SearchIcon, to: "/dashboard/realtors" },
    {
      title: "Edit my info",
      icon: EditIcon,
      to: "/dashboard/realtor_profile/edit"
    }
  ];

  return data.map((cardData, index) => (
    <MenuCard
      key={index}
      title={cardData.title}
      icon={cardData.icon}
      onClick={cardData.onClick}
      index={index}
      to={cardData.to}
    />
  ));
};

RealtorDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const ClientDashboard = () => {
  const data = [
    {
      title: "Fill out the form",
      icon: FormatIndentIncreaseIcon,
      to: "/dashboard/order"
    },
    { title: "Search an agent", icon: SearchIcon, to: "/dashboard/realtors" },
    {
      title: "Show my orders",
      icon: ListIcon,
      to: "/dashboard/orders"
    }
  ];
  return data.map((cardData, index) => (
    <MenuCard
      key={index}
      title={cardData.title}
      icon={cardData.icon}
      onClick={cardData.onClick}
      index={index}
      to={cardData.to}
    />
  ));
};
