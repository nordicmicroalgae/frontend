import React from 'react';
import PropTypes from 'prop-types';

import Authority from 'Components/Authority';
import ScientificName from 'Components/ScientificName';
import Placeholder from 'Components/Placeholder';
import { useGetSynonymsQuery } from 'Slices/synonyms';
import getKey from 'Utilities/getKey';


const propTypes = {
  taxon: PropTypes.string.isRequired,
};

const Synonyms = ({ taxon }) => {
  const { isFetching, isSuccess, currentData } = (
    useGetSynonymsQuery({taxon})
  );

  return (
    isFetching ? (
      <div className="synonyms is-loading">
        <h2><Placeholder /></h2>
        <ul className="synonym-list">
          {(new Array(4).fill(null).map((_n, index) => (
            <li
              className="synonym-item"
              key={getKey('synonym-placeholder', index)}
            >
              <Placeholder />
            </li>
          )))}
        </ul>
      </div>
    ) :
    isSuccess ? (
      <div className="synonyms">
        <h2>Synonyms</h2>
        {(Array.isArray(currentData) && currentData.length > 0) ? (
          <ul className="synonym-list">
            {currentData.map(({authority, synonymName}) => (
              <li
                className="synonym-item"
                key={getKey('synonym', synonymName)}
              >
                <ScientificName>
                  {synonymName}
                </ScientificName>
                {authority && (
                  <>
                    {' '}
                    <Authority>
                      {authority}
                    </Authority>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No synonyms available for this taxon</p>
        )}
      </div>
    ) :
    null
  );
};

Synonyms.propTypes = propTypes;


export default Synonyms;
