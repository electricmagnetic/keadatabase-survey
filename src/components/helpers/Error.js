import React from 'react';
import PropTypes from 'prop-types';

import './Error.css';

const Error = ({ message, children }) => {
  return (
    <div className="Error alert alert-primary" role="alert">
      <p className="m-0">
        <strong>{message}</strong>
      </p>
      {children}
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Error.defaultProps = {
  message: 'Error',
};

export default Error;
