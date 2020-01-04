import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import SearchIcon from "@material-ui/icons/Search";

import { MenuCard } from "src/components/shared/MenuCard";

export const userRoles = {
  CLIENT: "client",
  REALTOR: "realtor"
};

const DashboardMenuComponent = ({ user }) => {
  let data = [];

  if (user.role === userRoles.CLIENT) {
    data = [
      {
        title: "Fill out the form",
        icon: FormatIndentIncreaseIcon,
        onClick: () => {}
      },
      { title: "Search an agent", icon: SearchIcon, onClick: () => {} }
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
  return data.map((cardData, index) => (
    <MenuCard
      key={index}
      title={cardData.title}
      icon={cardData.icon}
      onClick={cardData.onClick}
      align={index % 2 === 0 ? "right" : "left"}
    />
  ));
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
