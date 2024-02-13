import React from 'react';
import PropTypes from 'prop-types';

import Authority from 'Components/Authority';
import ScientificName from 'Components/ScientificName';
import Picture from 'Components/Media/Picture';


const propTypes = {
  data: PropTypes.shape({
    scientificName: PropTypes.string,
    authority: PropTypes.string,
    thumbnail: PropTypes.string
  }),
  getItemLinkProps: PropTypes.func,
  Link: PropTypes.node
};

const defaultProps = {
  Link: 'a',
  getItemLinkProps: _data => ({
    href: '#',
    onClick: e => e.preventDefault()
  })
};

const TaxonListItem = ({ data, virtual, getItemLinkProps, Link }) => (
  <li
    className="taxon-list-item"
    style={{
      '--virtual-item-top': virtual && `${virtual.top}px`,
      '--virtual-item-height': virtual && `${virtual.height}px`
    }}
  >
  <Link
    className="taxon-list-item-link"
    { ...getItemLinkProps(data) }
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
  </Link>
  </li>
);

TaxonListItem.propTypes = propTypes;

TaxonListItem.defaultProps = defaultProps;

export default TaxonListItem;
