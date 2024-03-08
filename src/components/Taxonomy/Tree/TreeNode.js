import React, { useMemo } from 'react';

import propTypes from './propTypes';
import defaultProps from './defaultProps';
import reduceChildren from './helpers/reduceChildren';
import ScientificName from 'Components/ScientificName';
import { PlusIcon, DashIcon } from 'Components/Icons';
import Tree from './Tree';


const TreeNode = ({
  taxon,
  data,
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

  const hasChildren = useMemo(() =>
    reduceChildren(data, taxon, { ranks }).length > 0,
    [data, taxon, ranks]
  );

  return (
    <li
      className={
        selected === taxon
          ? 'taxonomy-tree-node selected'
          : 'taxonomy-tree-node'
      }
      style={{
        '--tree-node-level': level
      }}
      aria-level={level}
    >
      <div className="taxonomy-tree-node-rank">
        {data[taxon].rank}
      </div>
      <div className="taxonomy-tree-node-controls">
        <Link
          { ...(linkProps => ({
            ...linkProps,
            onClick: ev => {
              onSelect(data[taxon]);
              linkProps.onClick && linkProps.onClick(ev);
            }
          }))(getLinkProps(data[taxon]))}
          className="taxonomy-tree-node-link"
        >
          <ScientificName>
            {data[taxon].scientificName}
          </ScientificName>
        </Link>
        {hasChildren && (
          <button
            type="button"
            className="taxonomy-tree-node-toggle"
            onClick={_ev =>
              path.includes(taxon)
                ? onCollapse(data[taxon])
                : onExpand(data[taxon])
            }
          >
            {path.includes(taxon) ? (
              <DashIcon />
            ) : (
              <PlusIcon />
            )}
          </button>
        )}
      </div>
      <div className="subordinate-taxa">
        {hasChildren && path.includes(taxon) && (
          <Tree
            parent={taxon}
            data={data}
            path={path}
            selected={selected}
            ranks={ranks}
            level={level + 1}
            onCollapse={onCollapse}
            onExpand={onExpand}
            onSelect={onSelect}
            Link={Link}
            getLinkProps={getLinkProps}
          />
        )}
      </div>
    </li>
  );
}

TreeNode.propTypes = propTypes;

TreeNode.defaultProps = defaultProps;

export default TreeNode;
