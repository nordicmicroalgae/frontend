import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Tree from 'Components/Taxonomy/Tree';
import { useGetAllTaxaQuery, selectById } from 'Slices/taxa';


const propTypes = {
  taxon: PropTypes.string,
};

const Taxonomy = ({ taxon }) => {

  const [ navigationIsExpanded, setNavigationIsExpanded ] = useState(false);

  useEffect(() => {
    if (navigationIsExpanded) {
      document.body.classList.add('has-expanded-taxonomy');
    } else {
      document.body.classList.remove('has-expanded-taxonomy');
    }
  }, [ navigationIsExpanded ]);

  const query = useGetAllTaxaQuery();

  const selectedTaxon = useSelector(
    state => selectById(state, taxon)
  );

  const getTaxonKey = ({ slug }) => slug;

  const handleClickToggleTaxonomy = _ev => {
    setNavigationIsExpanded(!navigationIsExpanded);
  };

  const initialPath = (
    (selectedTaxon?.classification ?? []).map(getTaxonKey)
  );

  const selectedKey = (
    selectedTaxon ? getTaxonKey(selectedTaxon) : null
  );

  return (
    <>
      <button
        type="button"
        className="taxonomy-toggle"
        onClick={handleClickToggleTaxonomy}
        aria-controls="taxonomy-navigation"
        aria-expanded={navigationIsExpanded}
      >
        <span className="taxonomy-toggle-bar" />
        <span className="taxonomy-toggle-bar" />
        <span className="taxonomy-toggle-bar" />
      </button>
      <div id="taxonomy-navigation" className="taxon-view-taxonomy">
        <h2 className="taxon-view-taxonomy-heading">
          Taxonomy
        </h2>
        {query.data?.entities && (
          <Tree
            data={query.data.entities}
            getTaxonKey={getTaxonKey}
            initialPath={initialPath}
            selected={selectedKey}
            Link={Link}
            getLinkProps={({ slug }) => ({
              to: `/taxon/${slug}/`
            })}
          />
        )}
      </div>
    </>
  );
};

Taxonomy.propTypes = propTypes;


export default Taxonomy;
