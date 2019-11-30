import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  color: PropTypes.string
};

const defaultProps = {
  color: '#000'
};

const Logo = ({ color }) => (
  <svg viewBox="0 0 80 110" width="80" height="110">
    <path d="M 0 110 L 0 0 L 20 0 L 20 70 L 60 70 L 60 0 L 80 0 L 80 80 L 20 80 L 20 110 L 0 110 Z" fill={color} />
  </svg>
);

Logo.propTypes = propTypes;

Logo.defaultProps = defaultProps;

export default Logo;
