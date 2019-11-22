import React from 'react';
import PropTypes from 'prop-types';

import TaxonList from './TaxonList';


const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      scientificName: PropTypes.string,
      authority: PropTypes.string,
      thumbnail: PropTypes.string
    })
  )
};

const defaultProps = {
  data: []
};

const GroupedTaxonList = (props) => {
    const data = {};

    props.data.forEach(item => {
      const group = item
        .scientificName
        .substring(0, 1)
        .toUpperCase();

      if (data[group] == null) {
        data[group] = [];
      }

      data[group].push(item);
    });

  const groups = Object.keys(data).sort();

  const refs = {};

  const scrollIntoView = (ev) => {
    refs[ev.target.value].scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="taxon-list-grouped">
      <nav className="taxon-list-navigation">
        <ul>
          {groups.map(group => (
            <li className="taxon-list-navigation-item">
              <button type="button" value={group} onClick={scrollIntoView}>
                {group}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {groups.map(group => (
        <div className="taxon-list-group" ref={el => refs[group] = el}>
          <h2 className="taxon-list-group-title">
            {group}
          </h2>
          <TaxonList data={data[group]} />
        </div>
      ))}
    </div>
  );
};

GroupedTaxonList.propTypes = propTypes;

GroupedTaxonList.defaultProps = defaultProps;

export default GroupedTaxonList;
