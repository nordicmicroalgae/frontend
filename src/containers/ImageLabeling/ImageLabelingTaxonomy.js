import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Tree from 'Components/Taxonomy/Tree';
import { useGetAllTaxaQuery, selectById } from 'Slices/taxa';

const defaultRanks = [
  'Domain',
  'Kingdom',
  'Phylum',
  'Class',
  'Order',
  'Family',
  'Genus',
  'Species',
  'Subspecies',
  'Variety',
  'Form',
  'Forma',
];

const propTypes = {
  selectedTaxon: PropTypes.string,
  onTaxonSelect: PropTypes.func.isRequired,
  imageLabelingTaxa: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    count: PropTypes.number,
  })),
};

const ImageLabelingTaxonomy = ({ selectedTaxon, onTaxonSelect, imageLabelingTaxa }) => {
  const [navigationIsExpanded, setNavigationIsExpanded] = useState(false);

  useEffect(() => {
    if (navigationIsExpanded) {
      document.body.classList.add('has-expanded-filters');
    } else {
      document.body.classList.remove('has-expanded-filters');
    }
    return () => {
      document.body.classList.remove('has-expanded-filters');
    };
  }, [navigationIsExpanded]);

  const query = useGetAllTaxaQuery();

  const selectedTaxonData = useSelector(
    state => selectById(state, selectedTaxon)
  );

  const getTaxonKey = ({ slug }) => slug;

  const handleClickToggleTaxonomy = () => {
    setNavigationIsExpanded(!navigationIsExpanded);
  };

  // Build a map of taxa slugs to their image counts (stable reference)
  const imageLabelingCounts = useMemo(() => {
    if (!imageLabelingTaxa) return new Map();
    const map = new Map();
    imageLabelingTaxa.forEach(t => {
      if (t.slug && t.slug !== '__no_taxon__') {
        map.set(t.slug, t.count || 0);
      }
    });
    return map;
  }, [imageLabelingTaxa]);

  // Use all taxa entities, but add image counts to scientificName where applicable
  const entitiesWithCounts = useMemo(() => {
    if (!query.data?.entities) {
      return null;
    }

    const entities = query.data.entities;
    
    // If no image counts yet, just return the original entities
    if (imageLabelingCounts.size === 0) {
      return entities;
    }

    // Build new entities object with counts appended to scientificName
    const withCounts = {};
    Object.keys(entities).forEach(slug => {
      const taxon = entities[slug];
      const imageCount = imageLabelingCounts.get(slug) || 0;
      withCounts[slug] = {
        ...taxon,
        scientificName: imageCount > 0 
          ? `${taxon.scientificName} (${imageCount})`
          : taxon.scientificName,
      };
    });

    return withCounts;
  }, [query.data?.entities, imageLabelingCounts]);

  // Start with tree collapsed - empty initialPath
  const initialPath = useMemo(() => {
    // Only expand to show the selected taxon's path, if one is selected
    if (selectedTaxonData?.classification) {
      return selectedTaxonData.classification.map(c => 
        typeof c === 'string' ? c : c.slug
      );
    }
    return [];
  }, [selectedTaxonData]);

  const selectedKey = selectedTaxonData ? getTaxonKey(selectedTaxonData) : null;

  const hasTaxa = entitiesWithCounts && Object.keys(entitiesWithCounts).length > 0;
  const hasUnknownTaxon = imageLabelingTaxa?.some(t => t.slug === '__no_taxon__');
  const unknownTaxonCount = imageLabelingTaxa?.find(t => t.slug === '__no_taxon__')?.count || 0;

  const totalImageCount = useMemo(() => {
    if (!imageLabelingTaxa) return 0;
    return imageLabelingTaxa.reduce((sum, t) => sum + (t.count || 0), 0);
  }, [imageLabelingTaxa]);

  return (
    <>
      <button
        type="button"
        className="filters-toggle"
        onClick={handleClickToggleTaxonomy}
        aria-controls="filters-navigation"
        aria-expanded={navigationIsExpanded}
      >
        <span className="filters-toggle-bar" />
        <span className="filters-toggle-bar" />
        <span className="filters-toggle-bar" />
      </button>
      <aside id="filters-navigation" className="image-labeling-filters">
        <div className="filters-content">
          <h2 className="image-labeling-filters-heading">Taxa</h2>
          
          <div className="taxonomy-all-taxa">
            <button
              onClick={() => {
                onTaxonSelect(null);
                setNavigationIsExpanded(false);
              }}
              className={`taxonomy-all-taxa-button ${selectedTaxon == null ? 'is-selected' : ''}`}
            >
              All taxa ({totalImageCount})
            </button>
          </div>

          {hasTaxa && (
            <div className="image-labeling-tree-wrapper">
              <Tree
                data={entitiesWithCounts}
                getTaxonKey={getTaxonKey}
                initialPath={initialPath}
                selected={selectedKey}
                ranks={defaultRanks}
                Link={Link}
                getLinkProps={({ slug }) => ({
                  to: `/image-labeling/?taxon=${slug}`,
                })}
              />
            </div>
          )}

          {hasUnknownTaxon && (
            <div className="taxonomy-unknown-taxon">
              <button
                onClick={() => {
                  onTaxonSelect('__no_taxon__');
                  setNavigationIsExpanded(false);
                }}
                className={`taxonomy-unknown-button ${selectedTaxon === '__no_taxon__' ? 'is-selected' : ''}`}
              >
                Unknown taxon ({unknownTaxonCount})
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

ImageLabelingTaxonomy.propTypes = propTypes;

export default ImageLabelingTaxonomy;