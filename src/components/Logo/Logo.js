import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  size: PropTypes.oneOf([16, 32, 64, 128])
};

const defaultProps = {
  theme: 'dark',
  size: 32
};

const Logo = ({ theme, size }) => (
  <svg viewBox="0 0 11 16" width={Math.round(size * 11 / 16)} height={size} aria-hidden={true} className={`logo logo-${theme}`}>
    <path className="logo-left" d="M 0 0 L 0 16 L 3 16 L 3 12 L 5.5 13 L 5.5 10 L 3 9 L 3 0 L 0 0 Z" />
    <path className="logo-right" d="M 8 0 L 11 0 L 11 12 L 5.5 13 L 5.5 10 L 8 9" />
  </svg>
);

Logo.propTypes = propTypes;

Logo.defaultProps = defaultProps;

export default Logo;
