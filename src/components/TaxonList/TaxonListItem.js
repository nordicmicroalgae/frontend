import React from 'react';
import PropTypes from 'prop-types';

import Authority from '../Authority';
import ScientificName from '../ScientificName';
import Picture from '../Picture';


const propTypes = {
  data: PropTypes.shape({
    scientificName: PropTypes.string,
    authority: PropTypes.string,
    thumbnail: PropTypes.string
  })
};

const TaxonListItem = ({ data, virtual }) => (
  <li
    className="taxon-list-item"
    style={{
      '--virtual-item-top': virtual && `${virtual.top}px`,
      '--virtual-item-height': virtual && `${virtual.height}px`
    }}
  >
    <div className="taxon-list-item-thumbnail" style={{minWidth: "160px"}}>
      {data.thumbnail && (<Picture src={data.thumbnail} width={160} />)}
    </div>
    <h3 className="taxon-list-item-title">
      <ScientificName>
        {data.scientificName}
      </ScientificName>
      {' '}
      {data.authority && (<Authority>{data.authority}</Authority>)}
    </h3>
  </li>
);

TaxonListItem.propTypes = propTypes;

export default TaxonListItem;
