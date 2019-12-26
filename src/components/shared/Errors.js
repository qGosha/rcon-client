import React from "react";
import PropTypes from "prop-types";

export const SimpleErrorsList = ({ errors }) => {
  const values = Object.values(errors).filter(i => i);
  if (!values.length) return null;
  return (
    <ul>
      {values.map((error, i) => (
        <li style={{ color: "red" }} key={i}>
          {error}
        </li>
      ))}
    </ul>
  );
};

SimpleErrorsList.propTypes = {
  errors: PropTypes.object.isRequired
};
