import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import compileList from './helpers/compileList';
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
  ])
};

const defaultProps = {
  data: []
};

const TaxonList = ({ data, groupBy }) => {

  const list = compileList(data, groupBy);

  const refs = useRef({});

  const scrollIntoView = (ev) => {
    refs.current[ev.target.value].scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="taxon-list-container">
      {groupBy && (
        <nav className="taxon-list-navigation">
          <ul>
            {list.map(({ group }) => (
              <li className="taxon-list-navigation-item">
                <button type="button" value={group} onClick={scrollIntoView}>
                  {group}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {list.map(({ group, items }) => (
        <div className="taxon-list-group" ref={el => refs.current[group] = el}>
          {groupBy && (
            <h2 className="taxon-list-group-title">
              {group}
            </h2>
          )}
          <ul className="taxon-list">
            {items.map(item => (
              <TaxonListItem {...item} />
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
