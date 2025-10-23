import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  labelText: PropTypes.string,
  onChange: PropTypes.func
};

const Switch = ({
  theme = 'dark',
  checked = false,
  disabled = false,
  labelText = '',
  ...props
}) => (
  <div className={`switch switch-${theme}`}>
    <label className="switch-label">
      <input
        type="checkbox"
        role="switch"
        className="switch-input"
        defaultChecked={checked}
        disabled={disabled}
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

export default Switch;
