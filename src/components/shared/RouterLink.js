import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/display-name
export const RouterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));
