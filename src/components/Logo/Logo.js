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
    <path d="M 0 16 L 0 0 L 3 0 L 3 10 L 8 10 L 8 0 L 11 0 L 11 12 L 3 12 L 3 16 L 0 16 Z" />
  </svg>
);

Logo.propTypes = propTypes;

Logo.defaultProps = defaultProps;

export default Logo;
