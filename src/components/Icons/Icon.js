import './Icon.scss';

import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  size: PropTypes.oneOf([18, 24, 36, 48])
};

const Icon = ({ size = 24, theme = 'dark', children }) => (
  <svg
    viewBox={'0 0 18 18'}
    width={size}
    height={size}
    className={`icon icon-${theme}`}
    aria-hidden={true}
  >
    {children}
  </svg>
);

Icon.propTypes = propTypes;


export default Icon;
