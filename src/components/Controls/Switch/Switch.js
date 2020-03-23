import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  labelText: PropTypes.string,
  onChange: PropTypes.func
};

const defaultProps = {
  theme: 'dark',
  checked: false,
  disabled: false,
  labelText: ''
};

const Switch = ({ checked, labelText, theme, ...props }) => (
  <div className={`switch switch-${theme}`}>
    <label className="switch-label">
      <input
        type="checkbox"
        className="switch-input"
        defaultChecked={checked}
        { ...props }
      />
      <div className="switch-track" />
    {labelText && (
      <span className="switch-label-text">
        {labelText}
      </span>
    )}
    </label>
  </div>
);

Switch.propTypes = propTypes;

Switch.defaultProps = defaultProps;

export default Switch;
