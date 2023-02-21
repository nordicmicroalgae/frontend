import React from 'react';

import propTypes from './propTypes';
import defaultProps from './defaultProps';
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
}) => (
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
      {(data[taxon].children == null || data[taxon].children.length > 0) && (
        <button
          type="button"
          className="taxonomy-tree-node-toggle"
          onClick={_ev =>
            path.includes(taxon)
              ? onCollapse(data[taxon])
              : onExpand(data[taxon])
          }
          disabled={data[taxon].children == null}
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
      {(data[taxon].children && data[taxon].children.length > 0 && path.includes(taxon)) && (
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

TreeNode.propTypes = propTypes;

TreeNode.defaultProps = defaultProps;

export default TreeNode;
