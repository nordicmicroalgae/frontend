import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Authority from 'Components/Authority';
import ScientificName from 'Components/ScientificName';
import Tree from 'Components/Taxonomy/Tree';
import { useGetAllTaxaQuery, selectById } from 'Slices/taxa';
import MediaView from 'Containers/MediaView';
import Facts from './Facts';


const TaxonView = ({ match }) => {
  const [ taxonomyIsExpanded, setTaxonomyIsExpanded ] = useState(false);

  useEffect(() => {
    if (taxonomyIsExpanded) {
      document.body.classList.add('has-expanded-taxonomy');
    } else {
      document.body.classList.remove('has-expanded-taxonomy');
    }
  }, [ taxonomyIsExpanded ]);

  const query = useGetAllTaxaQuery();

  const taxon = useSelector(
    state => selectById(state, match.params.slug)
  );

  const getTaxonKey = ({ slug }) => slug;

  const handleClickToggleTaxonomy = _ev => {
    setTaxonomyIsExpanded(!taxonomyIsExpanded);
  };

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
      <button
        type="button"
        className="taxonomy-toggle"
        onClick={handleClickToggleTaxonomy}
        aria-controls="taxonomy-navigation"
        aria-expanded={taxonomyIsExpanded}
      >
        <span className="taxonomy-toggle-bar" />
        <span className="taxonomy-toggle-bar" />
        <span className="taxonomy-toggle-bar" />
      </button>
      <div id="taxonomy-navigation" className="taxon-view-taxonomy">
        <h2 className="taxon-view-taxonomy-heading">
          Taxonomy
        </h2>
        <Tree
          data={query.data.entities}
          getTaxonKey={getTaxonKey}
          initialPath={
            taxon.classification.map(getTaxonKey)
          }
          selected={getTaxonKey(taxon)}
          Link={Link}
          getLinkProps={({ slug }) => ({
            to: `/taxon/${slug}/`
          })}
        />
      </div>
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
