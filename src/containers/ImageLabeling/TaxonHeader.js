import React from 'react';
import { Link } from 'react-router-dom';

import ScientificName from 'Components/ScientificName';
import Authority from 'Components/Authority';


const TaxonHeader = ({ taxon, aphiaId, factsFetching }) => {
  if (!taxon) {
    return null;
  }

  return (
    <header className="image-labeling-taxon-header">
      <h1 className="taxon-header-title">
        <ScientificName>{taxon.scientificName}</ScientificName>
        {taxon.authority && (
          <>
            {' '}
            <Authority>{taxon.authority}</Authority>
          </>
        )}
      </h1>

      <div className="taxon-header-link">
        <Link to={`/taxon/${taxon.slug}/`} rel="noopener noreferrer">
          More about this taxon &rarr;
        </Link>
      </div>

      {!factsFetching && aphiaId && (
        <div className="taxon-header-aphia">
          <strong>AphiaID:</strong>{' '}
          <a
            href={`https://www.marinespecies.org/aphia.php?p=taxdetails&id=${encodeURIComponent(aphiaId)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {aphiaId}
          </a>
        </div>
      )}

      <div className="taxon-header-description">
        {taxon.imageLabelingDescription ? (
          <div>{taxon.imageLabelingDescription}</div>
        ) : (
          <div className="taxon-header-no-description">
            No description available yet
          </div>
        )}
      </div>
    </header>
  );
};

export default TaxonHeader;
