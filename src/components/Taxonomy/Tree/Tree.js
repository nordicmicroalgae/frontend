import React, { useMemo } from 'react';

import propTypes from './propTypes';
import defaultProps from './defaultProps';
import compileList from './helpers/compileList';
import TreeNode from './TreeNode';


const Tree = ({
  data,
  parent,
  path,
  selected,
  ranks,
  level,
  onCollapse,
  onExpand,
  onSelect,
  Link,
  getLinkProps
}) => {

  const taxa = useMemo(() =>
    compileList(data, parent, { ranks }),
    [data, parent, ranks]
  );

  return (
    <ul className="taxonomy-tree">
      {taxa.map(taxon => (
        <TreeNode
          key={taxon}
          taxon={taxon}
          data={data}
          path={path}
          selected={selected}
          ranks={ranks}
          level={level}
          onCollapse={onCollapse}
          onExpand={onExpand}
          onSelect={onSelect}
          Link={Link}
          getLinkProps={getLinkProps}
        />
      ))}
    </ul>
  );
};


Tree.propTypes = propTypes;

Tree.defaultProps = defaultProps;

export default Tree;
