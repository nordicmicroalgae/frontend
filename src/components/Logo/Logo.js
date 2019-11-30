import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf([16, 32, 64, 128])
};

const defaultProps = {
  color: '#000',
  size: 32
};

const Logo = ({ color, size }) => (
  <svg viewBox="0 0 11 16" width={Math.round(size * 11 / 16)} height={size} aria-hidden={true} className="logo">
    <path d="M 0 16 L 0 0 L 3 0 L 3 10 L 8 10 L 8 0 L 11 0 L 11 12 L 3 12 L 3 16 L 0 16 Z" fill={color} />
  </svg>
);

Logo.propTypes = propTypes;

Logo.defaultProps = defaultProps;

export default Logo;
