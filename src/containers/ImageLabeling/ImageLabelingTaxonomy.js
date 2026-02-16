import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useGetImageLabelingGroupedByPlanktonQuery } from 'Slices/labeling';
import { PlusIcon, DashIcon } from 'Components/Icons';

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
  const [expandedGroups, setExpandedGroups] = useState(null); // null = not initialized yet
  const [expandedTaxa, setExpandedTaxa] = useState(new Set());

  const { data: groupedData = [], isLoading } = useGetImageLabelingGroupedByPlanktonQuery();

  // Initialize expanded groups to all groups when data first loads
  useEffect(() => {
    if (groupedData.length > 0 && expandedGroups === null) {
      setExpandedGroups(new Set(groupedData.map(g => g.group_name)));
    }
  }, [groupedData, expandedGroups]);

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

  const handleClickToggleTaxonomy = () => {
    setNavigationIsExpanded(!navigationIsExpanded);
  };

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => {
      // If prev is null, initialize with all groups expanded except the one being toggled
      if (prev === null) {
        const allGroups = new Set(groupedData.map(g => g.group_name));
        allGroups.delete(groupName);
        return allGroups;
      }
      const next = new Set(prev);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  };

  const toggleTaxon = (taxonSlug) => {
    setExpandedTaxa(prev => {
      const next = new Set(prev);
      if (next.has(taxonSlug)) {
        next.delete(taxonSlug);
      } else {
        next.add(taxonSlug);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedGroups(new Set(groupedData.map(g => g.group_name)));
    // Also expand all taxa
    const allTaxaSlugs = groupedData.flatMap(g => g.taxa.map(t => t.taxon_slug));
    setExpandedTaxa(new Set(allTaxaSlugs));
  };

  const collapseAll = () => {
    setExpandedGroups(new Set());
    setExpandedTaxa(new Set());
  };

  const resetToDefault = () => {
    // Default: groups expanded, taxa collapsed
    setExpandedGroups(new Set(groupedData.map(g => g.group_name)));
    setExpandedTaxa(new Set());
  };

  // Build a map of taxa slugs to their image counts from the summary data
  const imageLabelingCounts = useMemo(() => {
    if (!imageLabelingTaxa) return new Map();
    const map = new Map();
    imageLabelingTaxa.forEach(t => {
      if (t.slug && t.slug !== 'unknown') {
        map.set(t.slug, t.count || 0);
      }
    });
    return map;
  }, [imageLabelingTaxa]);

  const hasUnknownTaxon = imageLabelingTaxa?.some(t => t.slug === 'unknown');
  const unknownTaxonCount = imageLabelingTaxa?.find(t => t.slug === 'unknown')?.count || 0;

  // Count number of taxa (excluding unknown)
  const totalTaxaCount = useMemo(() => {
    if (!imageLabelingTaxa) return 0;
    return imageLabelingTaxa.filter(t => t.slug !== 'unknown').length;
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

          {!isLoading && groupedData.length > 0 && (
            <div className="taxonomy-expand-collapse">
              <button
                type="button"
                className="taxonomy-expand-collapse-button"
                onClick={expandAll}
              >
                Expand all
              </button>
              <button
                type="button"
                className="taxonomy-expand-collapse-button"
                onClick={collapseAll}
              >
                Collapse all
              </button>
              <button
                type="button"
                className="taxonomy-expand-collapse-button"
                onClick={resetToDefault}
              >
                Reset
              </button>
            </div>
          )}

          <div className="taxonomy-all-taxa">
            <button
              onClick={() => {
                onTaxonSelect(null);
                setNavigationIsExpanded(false);
              }}
              className={`taxonomy-all-taxa-button ${selectedTaxon == null ? 'is-selected' : ''}`}
            >
              All taxa ({totalTaxaCount})
            </button>
          </div>

          {isLoading && (
            <div className="taxonomy-loading">Loading...</div>
          )}

          {!isLoading && groupedData.length > 0 && (
            <div className="plankton-groups-tree">
              <ul className="plankton-groups-list">
                {groupedData.map((group) => {
                  const isGroupExpanded = expandedGroups?.has(group.group_name) ?? true;
                  const groupTaxonCount = group.taxa.reduce(
                    (sum, t) => sum + (imageLabelingCounts.get(t.taxon_slug) || 0),
                    0
                  );

                  return (
                    <li key={group.group_name} className="plankton-group-item">
                      <div className="plankton-group-header">
                        <span className="plankton-group-name">
                          {group.group_name} ({groupTaxonCount})
                        </span>
                        <button
                          type="button"
                          className="plankton-group-toggle"
                          onClick={() => toggleGroup(group.group_name)}
                          aria-expanded={isGroupExpanded}
                        >
                          {isGroupExpanded ? <DashIcon /> : <PlusIcon />}
                        </button>
                      </div>

                      {isGroupExpanded && (
                        <ul className="plankton-taxa-list">
                          {group.taxa.map((taxon) => {
                            const isTaxonExpanded = expandedTaxa.has(taxon.taxon_slug);
                            const taxonCount = imageLabelingCounts.get(taxon.taxon_slug) || 0;
                            const hasTitles = taxon.titles && taxon.titles.length > 0;

                            return (
                              <li key={taxon.taxon_slug} className="plankton-taxon-item">
                                <div className="plankton-taxon-header">
                                  <Link
                                    to={`/image-labeling/?taxon=${taxon.taxon_slug}`}
                                    className={`plankton-taxon-link ${selectedTaxon === taxon.taxon_slug ? 'is-selected' : ''}`}
                                    onClick={() => {
                                      onTaxonSelect(taxon.taxon_slug);
                                      setNavigationIsExpanded(false);
                                    }}
                                  >
                                    <em>{taxon.taxon_name}</em> ({taxonCount})
                                  </Link>
                                  {hasTitles && (
                                    <button
                                      type="button"
                                      className="plankton-taxon-toggle"
                                      onClick={() => toggleTaxon(taxon.taxon_slug)}
                                      aria-expanded={isTaxonExpanded}
                                    >
                                      {isTaxonExpanded ? <DashIcon /> : <PlusIcon />}
                                    </button>
                                  )}
                                </div>

                                {isTaxonExpanded && hasTitles && (
                                  <ul className="plankton-titles-list">
                                    {taxon.titles.map((title) => (
                                      <li key={title} className="plankton-title-item">
                                        {title}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {hasUnknownTaxon && (
            <div className="taxonomy-unknown-taxon">
              <button
                onClick={() => {
                  onTaxonSelect('unknown');
                  setNavigationIsExpanded(false);
                }}
                className={`taxonomy-unknown-button ${selectedTaxon === 'unknown' ? 'is-selected' : ''}`}
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
