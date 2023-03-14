import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Authority from 'Components/Authority';
import ScientificName from 'Components/ScientificName';
import { useGetAllTaxaQuery, selectById } from 'Slices/taxa';
import Taxonomy from './Taxonomy';
import MediaView from 'Containers/MediaView';
import Facts from './Facts';


const TaxonView = () => {
  const params = useParams();

  const query = useGetAllTaxaQuery();

  const taxon = useSelector(
    state => selectById(state, params.slug)
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
      <Taxonomy taxon={params.slug} />
      <div className="taxon-view-media">
        <MediaView query={{taxon: taxon.slug}}>
          <MediaView.Details />
          <MediaView.Thumbnails fieldList={[]} />
        </MediaView>
      </div>
      <div className="taxon-view-facts">
        <Facts taxon={taxon.slug}>
          <Facts.Biovolumes />
        </Facts>
      </div>
    </section>
  );
};


export default TaxonView;
