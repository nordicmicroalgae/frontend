import React from 'react';

import FilterSection from './FilterSection';

const formatNotSpecified = (name) =>
  name === '__not_specified__' ? 'Not specified' : name;

const AttributeFilters = ({
  filtersExpanded,
  onToggleFilters,
  hasActiveFilters,
  onResetFilters,
  instrumentsMap,
  institutesMap,
  geographicAreasMap,
  selectedInstruments,
  selectedInstitutes,
  selectedGeographicAreas,
  onInstrumentToggle,
  onInstituteToggle,
  onGeographicAreaToggle,
}) => (
  <>
    <button
      type="button"
      className="attribute-filters-toggle"
      onClick={onToggleFilters}
      aria-controls="attribute-filters"
      aria-expanded={filtersExpanded}
    >
      <span className="attribute-filters-toggle-icon">&#x2699;</span>
      <span className="attribute-filters-toggle-text">Filters</span>
      {hasActiveFilters && (
        <span className="attribute-filters-active-count">
          ({selectedInstruments.length + selectedInstitutes.length + selectedGeographicAreas.length})
        </span>
      )}
    </button>
    <aside
      id="attribute-filters"
      className={`attribute-filters ${filtersExpanded ? 'is-expanded' : ''}`}
    >
      <div className="attribute-filters-header">
        <h3 className="attribute-filters-heading">Filter by attributes</h3>
        {hasActiveFilters && (
          <button
            type="button"
            className="attribute-filters-reset"
            onClick={onResetFilters}
          >
            Reset filters
          </button>
        )}
      </div>
      <div className="attribute-filters-content">
        {instrumentsMap.length > 0 && (
          <FilterSection
            heading="Imaging instruments"
            items={instrumentsMap}
            selected={selectedInstruments}
            onToggle={onInstrumentToggle}
          />
        )}
        {institutesMap.length > 0 && (
          <FilterSection
            heading="Institutes"
            items={institutesMap}
            selected={selectedInstitutes}
            onToggle={onInstituteToggle}
            formatName={formatNotSpecified}
          />
        )}
        {geographicAreasMap.length > 0 && (
          <FilterSection
            heading="Geographic areas"
            items={geographicAreasMap}
            selected={selectedGeographicAreas}
            onToggle={onGeographicAreaToggle}
            formatName={formatNotSpecified}
          />
        )}
      </div>
    </aside>
  </>
);

export default AttributeFilters;
