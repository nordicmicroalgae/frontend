import React from 'react';
import PropTypes from 'prop-types';

import TaxonListItem from './TaxonListItem';


const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      scientificName: PropTypes.string,
      authority: PropTypes.string,
      thumbnail: PropTypes.string
    })
  ),
};

const defaultProps = {
  data: []
};

const TaxonList = ({ data }) => (
  <ul className="taxon-list">
    {data.map(item => (
      <TaxonListItem {...item} />
    ))}
  </ul>
);


TaxonList.propTypes = propTypes;

TaxonList.defaultProps = defaultProps;

export default TaxonList;
