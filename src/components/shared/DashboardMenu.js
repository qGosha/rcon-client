import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { MenuCard } from "src/components/shared/MenuCard";
import { userRoles } from "src/components/constants/roles";
import history from "src/utils/history";
import { routingData } from "src/components/constants/routes";

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

  return routingData.realtor.map((cardData, index) => (
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
  return routingData.client.map((cardData, index) => (
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
