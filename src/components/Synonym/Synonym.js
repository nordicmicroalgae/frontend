import React from 'react';
import PropTypes from 'prop-types';

import ScientificName from 'Components/ScientificName';


const propTypes = {
  currentName: PropTypes.string.isRequired
};

const Synonym = ({ children, currentName }) => (
  <span title={`Current name is ${currentName}`}>
    <del className="synonym-name">
      <ScientificName>
        {children}
      </ScientificName>
    </del>
    {' '}
    <ins className="current-name">
      <ScientificName>
        {currentName}
      </ScientificName>
    </ins>
  </span>
);

Synonym.propTypes = propTypes;

export default Synonym;
