import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Tree from 'Components/Taxonomy/Tree';
import { useGetAllTaxaQuery, selectById } from 'Slices/taxa';

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

  // Ranks that should only show if they have images
  const conditionalRanks = new Set(['Kingdom', 'Phylum', 'Order', 'Family', 'Genus']);

  // Filter to only show taxa with images and their ancestors
  const filteredEntities = useMemo(() => {
    if (!query.data?.entities || imageLabelingCounts.size === 0) {
      return null;
    }

    const entities = query.data.entities;
    const includedSlugs = new Set();

    // For each taxon with images, include it and ALL its ancestors
    imageLabelingCounts.forEach((count, slug) => {
      const taxon = entities[slug];
      if (taxon) {
        includedSlugs.add(slug);

        if (taxon.classification) {
          taxon.classification.forEach(ancestor => {
            const ancestorSlug = typeof ancestor === 'string' ? ancestor : ancestor.slug;
            if (ancestorSlug) {
              includedSlugs.add(ancestorSlug);
            }
          });
        }
      }
    });

    // Helper to determine effective rank
    const getEffectiveRank = (slug) => {
      const taxon = entities[slug];
      if (!taxon) return null;
      const imageCount = imageLabelingCounts.get(slug) || 0;
      const isConditionalRank = conditionalRanks.has(taxon.rank);
      const hasImages = imageCount > 0;
      return (isConditionalRank && !hasImages) ? '_SkippedRank' : taxon.rank;
    };

    // Build filtered entities
    const filtered = {};
    includedSlugs.forEach(slug => {
      const taxon = entities[slug];
      if (taxon) {
        const imageCount = imageLabelingCounts.get(slug) || 0;
        
        // Filter children to only those in includedSlugs
        // AND update their rank in the child object for reduceChildren to read
        const filteredChildren = (taxon.children || [])
          .filter(child => {
            const childSlug = typeof child === 'string' ? child : child.slug;
            return includedSlugs.has(childSlug);
          })
          .map(child => {
            const childSlug = typeof child === 'string' ? child : child.slug;
            const childObj = typeof child === 'object' ? child : { slug: childSlug };
            return {
              ...childObj,
              slug: childSlug,
              rank: getEffectiveRank(childSlug),
            };
          });

        filtered[slug] = {
          ...taxon,
          rank: getEffectiveRank(slug),
          children: filteredChildren,
          scientificName: imageCount > 0 
            ? `${taxon.scientificName} (${imageCount})`
            : taxon.scientificName,
        };
      }
    });

    return filtered;
  }, [query.data?.entities, imageLabelingCounts]);

  // Determine which ranks to display
  const displayRanks = useMemo(() => {
    const baseRanks = ['Domain', 'Class', 'Genus', 'Species', 'Subspecies', 'Variety', 'Form', 'Forma'];
    
    if (!query.data?.entities || imageLabelingCounts.size === 0) {
      return baseRanks;
    }

    const entities = query.data.entities;
    const ranksToAdd = new Set();
    
    // Check which conditional ranks have taxa with images
    imageLabelingCounts.forEach((count, slug) => {
      if (count > 0) {
        const taxon = entities[slug];
        if (taxon?.rank && conditionalRanks.has(taxon.rank)) {
          ranksToAdd.add(taxon.rank);
        }
      }
    });

    return [...baseRanks, ...ranksToAdd];
  }, [query.data?.entities, imageLabelingCounts]);

  // Always keep tree fully expanded
  const initialPath = useMemo(() => {
    if (filteredEntities) {
      return Object.keys(filteredEntities);
    }
    return [];
  }, [filteredEntities]);

  const selectedKey = selectedTaxonData ? getTaxonKey(selectedTaxonData) : null;

  const hasTaxa = filteredEntities && Object.keys(filteredEntities).length > 0;
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
          <h2 className="image-labeling-filters-heading">
            <Link to="/image-labeling/" className="image-labeling-filters-heading-link">
              Image Labeling Guide
            </Link>
          </h2>
          
          <h3 className="image-labeling-filters-subheading">Taxonomy</h3>
          
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
                data={filteredEntities}
                getTaxonKey={getTaxonKey}
                initialPath={initialPath}
                selected={selectedKey}
                ranks={displayRanks}
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