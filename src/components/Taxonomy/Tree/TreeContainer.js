import React, { useEffect, useState } from 'react';
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


const TreeContainer = ({
  initialPath = null,
  initialSelected = null,
  getTaxonKey,
  onExpand = (_taxon) => {},
  onCollapse = (_taxon) => {},
  onSelect = (_taxon) => {},
  ...props
}) => {

  const [ path, setPath ] = useState(initialPath);

  useEffect(() => setPath(initialPath), [initialPath]);

  const handleClickExpand = taxon => {
    const taxonKey = getTaxonKey(taxon);
    if (!path.includes(taxonKey)) {
      setPath([ ...path, taxonKey]);
    }

    onExpand(taxon);
  };

  const handleClickCollapse = taxon => {
    const taxonKey = getTaxonKey(taxon);
    if (path.includes(taxonKey)) {
      setPath([...path.filter(n => n !== taxonKey)])
    }
    onCollapse(taxon);
  };

  const [ selected, setSelected ] = useState(initialSelected);

  const handleClickSelect = taxon => {
    setSelected(getTaxonKey(taxon));
    onSelect(taxon);
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

export default TreeContainer;
