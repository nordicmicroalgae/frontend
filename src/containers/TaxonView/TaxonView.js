import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Authority from 'Components/Authority';
import ScientificName from 'Components/ScientificName';
import Placeholder from 'Components/Placeholder';
import { useGetAllTaxaQuery, selectById } from 'Slices/taxa';
import Taxonomy from './Taxonomy';
import MediaView from 'Containers/MediaView';
import Facts from './Facts';
import Synonyms from './Synonyms';


const TaxonView = () => {
  const params = useParams();

  const { isFetching } = useGetAllTaxaQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  const taxon = useSelector(
    state => selectById(state, params.slug)
  );

  const isMissing = (
    isFetching === false && taxon == null
  );

  return (
    isFetching ? (
      <div className="taxon-view is-loading">
        <h1><Placeholder /></h1>
        <Taxonomy taxon={params.slug} />
      </div>
    ) :
    isMissing ? (
      <div className="taxon-view is-missing">
        <h1>Taxon not found</h1>
        <p>
          Unfortunately, the taxon you requested does
          not seem to currently be in our database.
        </p>
        <p>
          If you think that this is a misstake, please help us
          to correct that by sending an email to our administrators.
        </p>
        <p>
          You may also try to find the taxon you were looking for by
          either using the taxonomy tree on this page or by using
          the search field in the top navigation.
        </p>
        <Taxonomy taxon={params.slug} />
      </div>
    ) : (
      <div className="taxon-view">
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
        <section className="taxon-view-media">
          <MediaView query={{taxon: taxon.slug}}>
            <MediaView.Details />
            <MediaView.Thumbnails fieldList={[]} />
          </MediaView>
        </section>
        <section className="taxon-view-synonyms">
          <Synonyms taxon={taxon.slug} />
        </section>
        <section className="taxon-view-facts">
          <Facts taxon={taxon.slug}>
            <Facts.Biovolumes />
          </Facts>
        </section>
      </div>
    )
  );
};


export default TaxonView;
