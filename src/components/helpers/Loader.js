import React from 'react';

import './Loader.css';

const Loader = ({ small }) => {
  const loaderClasses = ['Loader', small && 'small'];
  return <div className={loaderClasses.join(' ')} />;
};

Loader.defaultProps = {
  small: false,
};

export default Loader;
