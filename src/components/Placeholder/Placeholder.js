import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  shape: PropTypes.oneOf([
    'rectangle',
    'circle',
  ]),
  repeat: PropTypes.number,
};

const Placeholder = ({ shape = 'rectangle', repeat = 1, wrapper: Wrapper = React.Fragment }) => (
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


Placeholder.propTypes = propTypes;

export default Placeholder;
