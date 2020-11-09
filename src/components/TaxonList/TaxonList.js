import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import compileList from './helpers/compileList';
import useVirtualList from './useVirtualList';
import TaxonListItem from './TaxonListItem';


const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      scientificName: PropTypes.string,
      authority: PropTypes.string,
      thumbnail: PropTypes.string
    })
  ),
  groupBy: PropTypes.oneOf([
    'scientificName',
    'authority'
  ]),
  itemHeight: PropTypes.number
};

const defaultProps = {
  data: [],
  itemHeight: 120
};

const TaxonList = ({ data, groupBy, itemHeight, getItemLinkProps, Link }) => {

  const list = useMemo(() => compileList(data, groupBy), [ data, groupBy ]);

  const refs = useRef({});

  const scrollIntoView = (ev) => {
    refs.current[ev.target.value].scrollIntoView({
      behavior: 'smooth'
    });
  };

  const virtualList = useVirtualList({ list, refs, itemHeight });

  return (
    <div className="taxon-list-container">
      {groupBy && (
        <nav className="taxon-list-navigation">
          <ul>
            {virtualList.map(({ group }) => (
              <li className="taxon-list-navigation-item">
                <button type="button" value={group} onClick={scrollIntoView}>
                  {group}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {virtualList.map(({ group, items, virtual }) => (
        <div className="taxon-list-group" ref={el => refs.current[group] = el}>
          {groupBy && (
            <h2 className="taxon-list-group-title">
              {group}
            </h2>
          )}
          <ul
            className={virtual
              ? 'taxon-list taxon-list-virtual'
              : 'taxon-list'
            }
            style={{
              '--virtual-list-height': virtual && `${virtual.height}px`
            }}
          >
            {items.map(({ item, virtual }) => (
              <TaxonListItem
                data={item}
                virtual={virtual}
                getItemLinkProps={getItemLinkProps}
                Link={Link}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


TaxonList.propTypes = propTypes;

TaxonList.defaultProps = defaultProps;

export default TaxonList;
