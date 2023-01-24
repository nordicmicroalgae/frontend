import React from 'react';
import { useSelector } from 'react-redux';

import Authority from '../../components/Authority';
import ScientificName from '../../components/ScientificName';
import { useGetAllTaxaQuery, selectById } from '../../slices/taxa';


const TaxonView = ({ match }) => {
  const query = useGetAllTaxaQuery();

  const taxon = useSelector(
    state => selectById(state, match.params.slug)
  );

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="taxon-view">
      <h1>
        <ScientificName>
          {taxon.scientificName}
        </ScientificName>
        {taxon.authority && (
          <>
            {' '}
            <Authority>
              {taxon.authority}
            </Authority>
          </>
        )}
      </h1>
    </section>
  );
};


export default TaxonView;
