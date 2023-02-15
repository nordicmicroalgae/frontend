import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  shape: PropTypes.oneOf([
    'rectangle',
    'circle',
  ]),
  repeat: PropTypes.number,
};

const defaultProps = {
  shape: 'rectangle',
  repeat: 1,
  wrapper: React.Fragment,
};


const Placeholder = ({shape, repeat, wrapper: Wrapper}) => (
  <span aria-live="polite" aria-busy="true">
    {Array(repeat).fill().map((_value, index) => (
      <Wrapper key={`faux-${index}`}>
        <span className={`placeholder placeholder-${shape}`}>
          &zwnj;
        </span>
      </Wrapper>
    ))}
  </span>
);

Placeholder.defaultProps = defaultProps;

Placeholder.propTypes = propTypes;

export default Placeholder;
