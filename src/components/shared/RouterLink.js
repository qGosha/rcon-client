import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import history from "src/utils/history";
import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
export const RouterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

export const ButtonLink = ({ to, onClick, ...rest }) => (
  <Button {...rest} onClick={onClick ? onClick : () => history.push(to)} />
);

ButtonLink.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func
};
