import React, { useMemo } from 'react';

import propTypes from './propTypes';
import compileList from './helpers/compileList';
import TreeNode from './TreeNode';


const Tree = ({
  data,
  parent,
  path = [],
  selected,
  ranks = [
    'Domain',
    'Kingdom',
    'Phylum',
    'Class',
    'Order',
    'Family',
    'Genus',
    'Species',
  ],
  level = 1,
  onCollapse = (_taxon) => {},
  onExpand = (_taxon) => {},
  onSelect = (_taxon) => {},
  Link = 'a',
  getLinkProps = (_taxon) => ({
    href: '#',
    onClick: ev => ev.preventDefault(),
  }),
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

export default Tree;
