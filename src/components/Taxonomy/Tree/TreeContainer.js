import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Types from '../types';
import Tree from './Tree';


const propTypes = {
  initialPath: PropTypes.arrayOf(
    Types.Identifier
  ),
  initialSelected: Types.Identifier,
  onExpand: PropTypes.func,
  onCollapse: PropTypes.func,
  onSelect: PropTypes.func,
  getTaxonKey: PropTypes.func.isRequired,
};

const defaultProps = {
  initialPath: null,
  initialSelected: null,
  onExpand(_taxon) {},
  onCollapse(_taxon) {},
  onSelect(_taxon) {},
};

const TreeContainer = ({ initialPath, initialSelected, getTaxonKey, ...props }) => {

  const [ path, setPath ] = useState(initialPath);

  const handleClickExpand = taxon => {
    const taxonKey = getTaxonKey(taxon);
    if (!path.includes(taxonKey)) {
      setPath([ ...path, taxonKey]);
    }

    props.onExpand(taxon);
  };

  const handleClickCollapse = taxon => {
    const taxonKey = getTaxonKey(taxon);
    if (path.includes(taxonKey)) {
      setPath([...path.filter(n => n !== taxonKey)])
    }
    props.onCollapse(taxon);
  };

  const [ selected, setSelected ] = useState(initialSelected);

  const handleClickSelect = taxon => {
    setSelected(getTaxonKey(taxon));
    props.onSelect(taxon);
  }

  return (
    <nav className="taxonomy-tree-container">
      <Tree
        { ...props }
        path={initialPath ? path : props.path}
        selected={initialSelected ? selected : props.selected}
        onExpand={handleClickExpand}
        onCollapse={handleClickCollapse}
        onSelect={handleClickSelect}
      />
    </nav>
  )
};

TreeContainer.propTypes = propTypes;

TreeContainer.defaultProps = defaultProps;

export default TreeContainer;
