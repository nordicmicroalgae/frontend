import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetImageLabelingImagesQuery, useGetImageLabelingSummaryQuery, useGetImageLabelingFirstPerTaxonQuery } from 'Slices/labeling';
import { useGetFactsQuery } from 'Slices/facts';
import { selectById } from 'Slices/taxa';

import ImageLabelingGallery from 'Components/ImageLabeling/ImageLabelingGallery';
import ImageLabelingTaxonomy from './ImageLabelingTaxonomy';
import ScientificName from 'Components/ScientificName';
import Authority from 'Components/Authority';
import './ImageLabelingPage.scss';

const InstrumentFilter = ({ instruments, selected, onToggle }) => (
  <div className="filter-section">
    <h4 className="filter-section-heading">Imaging instruments</h4>
    <ul className="filter-list">
      {instruments.map((inst) => (
        <li key={inst.name} className="filter-item">
          <label className="filter-label">
            <input
              type="checkbox"
              checked={selected.includes(inst.name)}
              onChange={() => onToggle(inst.name)}
              className="filter-checkbox"
            />
            <span>{inst.name} ({inst.count})</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const InstituteFilter = ({ institutes, selected, onToggle }) => (
  <div className="filter-section">
    <h4 className="filter-section-heading">Institutes</h4>
    <ul className="filter-list">
      {institutes.map((inst) => (
        <li key={inst.name} className="filter-item">
          <label className="filter-label">
            <input
              type="checkbox"
              checked={selected.includes(inst.name)}
              onChange={() => onToggle(inst.name)}
              className="filter-checkbox"
            />
            <span>
              {inst.name === '__not_specified__' ? 'Not specified' : inst.name} ({inst.count})
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const GeographicAreaFilter = ({ areas, selected, onToggle }) => (
  <div className="filter-section">
    <h4 className="filter-section-heading">Geographic areas</h4>
    <ul className="filter-list">
      {areas.map((area) => (
        <li key={area.name} className="filter-item">
          <label className="filter-label">
            <input
              type="checkbox"
              checked={selected.includes(area.name)}
              onChange={() => onToggle(area.name)}
              className="filter-checkbox"
            />
            <span>
              {area.name === '__not_specified__' ? 'Not specified' : area.name} ({area.count})
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const ImageLabelingPage = ({ location, history }) => {
  const taxonFromUrl = new URLSearchParams(location.search).get('taxon');
  const [selectedTaxon, setSelectedTaxon] = React.useState(taxonFromUrl);
  const [selectedInstruments, setSelectedInstruments] = React.useState([]);
  const [selectedInstitutes, setSelectedInstitutes] = React.useState([]);
  const [selectedGeographicAreas, setSelectedGeographicAreas] = React.useState([]);
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTaxon]);

  React.useEffect(() => {
    if (filtersExpanded) {
      document.body.classList.add('has-expanded-attribute-filters');
    } else {
      document.body.classList.remove('has-expanded-attribute-filters');
    }
    return () => {
      document.body.classList.remove('has-expanded-attribute-filters');
    };
  }, [filtersExpanded]);

  React.useEffect(() => {
    const urlTaxon = new URLSearchParams(location.search).get('taxon');
    if (urlTaxon !== selectedTaxon) {
      setSelectedTaxon(urlTaxon);
    }
  }, [location.search]);

  const isLandingPage = selectedTaxon === null;
  const hasActiveFilters = selectedInstruments.length > 0 || selectedInstitutes.length > 0 || selectedGeographicAreas.length > 0;

  // Fetch summary for unfiltered state
  const { data: summary } = useGetImageLabelingSummaryQuery();

  // Fetch landing images for unfiltered landing page
  const { data: landingImages = [], isLoading: landingLoading } = useGetImageLabelingFirstPerTaxonQuery(
    undefined,
    { skip: !isLandingPage || hasActiveFilters }
  );

  // Fetch ALL images when filters are active (for correct counting)
  const { data: allImages = [] } = useGetImageLabelingImagesQuery(
    {
      limit: 1000,
      fields: ['slug', 'renditions', 'related_taxon', 'taxon', 'attributes', 'file', 'priority'],
    },
    { skip: !hasActiveFilters }
  );

  // Fetch images for specific taxon
  const params = React.useMemo(() => {
    const p = {
      limit: 1000,
      fields: ['slug', 'renditions', 'related_taxon', 'taxon', 'attributes', 'file', 'priority'],
    };
    if (selectedTaxon && selectedTaxon !== 'unknown') {
      p.taxon = selectedTaxon;
    }
    return p;
  }, [selectedTaxon]);

  const { data: images = [], isLoading, error, isFetching } = useGetImageLabelingImagesQuery(
    params,
    { skip: isLandingPage }
  );

  // Filter all images when filters are active
  const filteredAllImages = React.useMemo(() => {
    if (!hasActiveFilters) return [];
    
    let result = allImages;
    
    if (selectedInstruments.length > 0) {
      result = result.filter((img) => {
        const instruments = img.attributes?.imagingInstrument || [];
        const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
        return instrumentArray.some((inst) => selectedInstruments.includes(inst));
      });
    }
    
    if (selectedInstitutes.length > 0) {
      result = result.filter((img) => {
        const institutes = img.attributes?.institute || [];
        const instituteArray = Array.isArray(institutes) ? institutes : [institutes];
        
        if (selectedInstitutes.includes('__not_specified__') && (!img.attributes?.institute || instituteArray.length === 0)) {
          return true;
        }
        
        return instituteArray.some((inst) => selectedInstitutes.includes(inst));
      });
    }
    
    if (selectedGeographicAreas.length > 0) {
      result = result.filter((img) => {
        const area = img.attributes?.geographicArea;
        
        if (selectedGeographicAreas.includes('__not_specified__') && !area) {
          return true;
        }
        
        return area && selectedGeographicAreas.includes(area);
      });
    }
    
    return result;
  }, [allImages, selectedInstruments, selectedInstitutes, selectedGeographicAreas, hasActiveFilters]);


  // Build taxon list from filtered images when filters active
  const filteredTaxaMap = React.useMemo(() => {
    if (!hasActiveFilters) return [];
    
    const map = new Map();
    filteredAllImages.forEach((img) => {
      const taxonObj = img.relatedTaxon || img.taxon || null;
      let slug = null;
      let name = null;
      
      if (taxonObj) {
        if (typeof taxonObj === 'object') {
          slug = taxonObj.id || taxonObj.slug || String(taxonObj);
          name = taxonObj.text || taxonObj.name || taxonObj.scientificName || taxonObj.slug || slug;
        } else {
          slug = taxonObj;
          name = taxonObj;
        }
      } else {
        slug = 'unknown';
        name = 'Unknown taxon';
      }

      const entry = map.get(slug) || { slug, name, count: 0 };
      entry.count += 1;
      map.set(slug, entry);
    });
    
    return Array.from(map.values()).sort((a, b) => {
      if (a.slug === 'unknown') return 1;
      if (b.slug === 'unknown') return -1;
      return String(a.name).localeCompare(String(b.name));
    });
  }, [filteredAllImages, hasActiveFilters]);

  // Use summary taxa when no filters, filtered taxa when filters active
  const taxaList = React.useMemo(() => {
    if (hasActiveFilters) {
      return filteredTaxaMap;
    }
    
    return [...(summary?.taxa || [])].sort((a, b) => {
      if (a.slug === 'unknown') return 1;
      if (b.slug === 'unknown') return -1;
      return String(a.name).localeCompare(String(b.name));
    });
  }, [hasActiveFilters, filteredTaxaMap, summary]);

  const instrumentsMap = summary?.instruments || [];
  const institutesMap = summary?.institutes || [];
  const geographicAreasMap = summary?.geographic_areas || [];

  // Filter taxon page images
  const filteredImages = React.useMemo(() => {
    let result = images;
    
    if (selectedTaxon === 'unknown') {
      result = result.filter((img) => !img.relatedTaxon && !img.taxon);
    }
    
    if (selectedInstruments.length > 0) {
      result = result.filter((img) => {
        const instruments = img.attributes?.imagingInstrument || [];
        const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
        return instrumentArray.some((inst) => selectedInstruments.includes(inst));
      });
    }
    
    if (selectedInstitutes.length > 0) {
      result = result.filter((img) => {
        const institutes = img.attributes?.institute || [];
        const instituteArray = Array.isArray(institutes) ? institutes : [institutes];
        
        if (selectedInstitutes.includes('__not_specified__') && (!img.attributes?.institute || instituteArray.length === 0)) {
          return true;
        }
        
        return instituteArray.some((inst) => selectedInstitutes.includes(inst));
      });
    }
    
    if (selectedGeographicAreas.length > 0) {
      result = result.filter((img) => {
        const area = img.attributes?.geographicArea;
        
        if (selectedGeographicAreas.includes('__not_specified__') && !area) {
          return true;
        }
        
        return area && selectedGeographicAreas.includes(area);
      });
    }
    
    return result;
  }, [images, selectedTaxon, selectedInstruments, selectedInstitutes, selectedGeographicAreas]);


  // Get first image per taxon for landing page
  const firstImagePerTaxon = React.useMemo(() => {
    if (!isLandingPage) return null;
    
    const sourceImages = hasActiveFilters ? filteredAllImages : landingImages;
    
    // Build a map of slug -> count from taxaList
    const taxaCounts = new Map();
    taxaList.forEach(t => {
      taxaCounts.set(t.slug, t.count || 0);
    });
    
    const taxonImages = new Map();
    sourceImages.forEach((img) => {
      let slug, name;
      
      if (img.taxonSlug) {
        slug = img.taxonSlug;
        name = img.taxonName;
      } else {
        const taxonObj = img.relatedTaxon || img.taxon || null;
        if (taxonObj) {
          if (typeof taxonObj === 'object') {
            slug = taxonObj.slug || String(taxonObj.id || taxonObj);
            name = taxonObj.scientific_name || taxonObj.scientificName || taxonObj.name || slug;
          } else {
            slug = taxonObj;
            name = taxonObj;
          }
        } else {
          slug = 'unknown';
          name = 'Unknown taxon';
        }
      }
      
      const existing = taxonImages.get(slug);
      
      if (!existing) {
        taxonImages.set(slug, {
          ...img,
          taxonSlug: slug,
          taxonName: name,
          imageCount: taxaCounts.get(slug) || 0,
        });
      } else if (img.priority != null && existing.priority != null) {
        if (img.priority < existing.priority) {
          taxonImages.set(slug, {
            ...img,
            taxonSlug: slug,
            taxonName: name,
            imageCount: taxaCounts.get(slug) || 0,
          });
        }
      } else if (img.priority != null && existing.priority == null) {
        taxonImages.set(slug, {
          ...img,
          taxonSlug: slug,
          taxonName: name,
          imageCount: taxaCounts.get(slug) || 0,
        });
      }
    });
    
    return Array.from(taxonImages.values()).sort((a, b) => {
      if (a.taxonSlug === 'unknown') return 1;
      if (b.taxonSlug === 'unknown') return -1;
      return String(a.taxonName).localeCompare(String(b.taxonName));
    });
  }, [isLandingPage, hasActiveFilters, filteredAllImages, landingImages, taxaList]);

  const handleTaxonSelect = (slug) => {
    setSelectedTaxon(slug);
    setFiltersExpanded(false);
    
    const newParams = new URLSearchParams();
    if (slug) {
      newParams.set('taxon', slug);
      history.push({ search: newParams.toString() });
    } else {
      history.push({ search: '' });
    }
  };

  const handleInstrumentToggle = (instrument) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument) ? prev.filter((i) => i !== instrument) : [...prev, instrument]
    );
  };

  const handleInstituteToggle = (institute) => {
    setSelectedInstitutes((prev) =>
      prev.includes(institute) ? prev.filter((i) => i !== institute) : [...prev, institute]
    );
  };

  const handleGeographicAreaToggle = (area) => {
    setSelectedGeographicAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleToggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  const handleResetFilters = () => {
    setSelectedInstruments([]);
    setSelectedInstitutes([]);
    setSelectedGeographicAreas([]);
  };

  const showLoading = isLandingPage ? landingLoading : (isLoading || isFetching);
  
  // Get taxon data from images if available, otherwise from Redux store
  const relatedTaxonFromImages = !isLandingPage && images.length > 0 ? images[0].relatedTaxon : null;
  const selectedTaxonFromStore = useSelector(state => selectById(state, selectedTaxon));
  
  // Use image data if available, otherwise fall back to store data for taxa without images
  const relatedTaxon = relatedTaxonFromImages || (
    !isLandingPage && selectedTaxon && selectedTaxon !== 'unknown' 
      ? selectedTaxonFromStore 
      : null
  );

  const { data: facts, isFetching: factsFetching } = useGetFactsQuery(relatedTaxon?.slug || selectedTaxon, {
    skip: !relatedTaxon?.slug && !selectedTaxon,
  });

  const aphiaId = React.useMemo(() => {
    if (!facts) return null;
    const wormsLink = facts.find(
      (fact) => fact.provider === 'WoRMS' && fact.collection === 'External Links'
    );
    return wormsLink?.attributes?.[0]?.externalId || null;
  }, [facts]);

  const displayImages = isLandingPage ? firstImagePerTaxon : filteredImages;

  // Check if there are any attribute filters available
  const hasAttributeFilters = instrumentsMap.length > 0 || institutesMap.length > 0 || geographicAreasMap.length > 0;

  return (
    <div className="container image-labeling-page">
      {/* Taxonomy sidebar (left) */}
      <ImageLabelingTaxonomy
        selectedTaxon={selectedTaxon}
        onTaxonSelect={handleTaxonSelect}
        imageLabelingTaxa={taxaList}
      />

      <main className="image-labeling-main">
        {isLandingPage ? (
          <header>
            <p>
              Welcome to the Image Labeling Guide of Nordic Microalgae. Select a taxon from the sidebar to explore example images and recommended identification and labeling practices for automated imaging instruments used in Nordic waters.
            </p>
            <p style={{ marginTop: '12px' }}>
              By sharing and comparing labeling approaches across laboratories and monitoring programs, we aim to harmonize image annotation in the Nordic region and strengthen the quality, consistency, and transferability of image classifiers used for marine monitoring.
            </p>
            <p style={{ marginTop: '12px' }}>
              Found a mislabeled image? Contact the contributor or email{' '}
              <a href="mailto:nordicmicroalgae@smhi.se" style={{ color: '#0066cc' }}>
                nordicmicroalgae@smhi.se
              </a>
              . To contribute images, see our{' '}
              <Link to="/how-to-contribute/" style={{ color: '#0066cc' }}>
                contribution guidelines
              </Link>
              .
            </p>
          </header>
        ) : selectedTaxon === 'unknown' ? (
          <header style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e0e0e0' }}>
            <h1 style={{ fontSize: '28px', marginBottom: 8 }}>
              Unknown taxon
            </h1>
            
            <div style={{ fontSize: '14px', color: '#333', marginTop: 12 }}>
              These images have not been assigned to a taxon yet.
            </div>
          </header>
        ) : (
          relatedTaxon && (
            <header style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e0e0e0' }}>
              <h1 style={{ fontSize: '28px', marginBottom: 8 }}>
                <ScientificName>{relatedTaxon.scientificName}</ScientificName>
                {relatedTaxon.authority && (
                  <>
                    {' '}
                    <Authority>{relatedTaxon.authority}</Authority>
                  </>
                )}
              </h1>
              
              <div style={{ marginBottom: 12 }}>
                <Link
                  to={`/taxon/${relatedTaxon.slug}/`}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '14px',
                    textDecoration: 'none',
                    color: '#0066cc',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  More about this taxon →
                </Link>
              </div>
            
              {!factsFetching && aphiaId && (
                <div style={{ fontSize: '14px', color: '#666', marginBottom: 12 }}>
                  <strong>AphiaID:</strong>{' '}<a
                  
                    href={`https://www.marinespecies.org/aphia.php?p=taxdetails&id=${aphiaId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: '#0066cc',
                    }}
                  >
                    {aphiaId}
                  </a>
                </div>
              )}

              <div style={{ fontSize: '14px', color: '#333', marginTop: 12 }}>
                {relatedTaxon.imageLabelingDescription ? (
                  <div>{relatedTaxon.imageLabelingDescription}</div>
                ) : (
                  <div style={{ fontStyle: 'italic', color: '#999' }}>
                    No description available yet
                  </div>
                )}
              </div>
            </header>
          )
        )}

        {/* Attribute filters section (right side, collapsible on mobile) */}
        {hasAttributeFilters && (
          <>
            <button
              type="button"
              className="attribute-filters-toggle"
              onClick={handleToggleFilters}
              aria-controls="attribute-filters"
              aria-expanded={filtersExpanded}
            >
              <span className="attribute-filters-toggle-icon">⚙</span>
              <span className="attribute-filters-toggle-text">Filters</span>
              {hasActiveFilters && <span className="attribute-filters-active-count">({selectedInstruments.length + selectedInstitutes.length + selectedGeographicAreas.length})</span>}
            </button>
            <aside id="attribute-filters" className={`attribute-filters ${filtersExpanded ? 'is-expanded' : ''}`}>
              <div className="attribute-filters-header">
                <h3 className="attribute-filters-heading">Filter by attributes</h3>
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="attribute-filters-reset"
                    onClick={handleResetFilters}
                  >
                    Reset filters
                  </button>
                )}
              </div>
              <div className="attribute-filters-content">
                {instrumentsMap.length > 0 && (
                  <InstrumentFilter 
                    instruments={instrumentsMap} 
                    selected={selectedInstruments} 
                    onToggle={handleInstrumentToggle} 
                  />
                )}
                
                {institutesMap.length > 0 && (
                  <InstituteFilter 
                    institutes={institutesMap} 
                    selected={selectedInstitutes} 
                    onToggle={handleInstituteToggle} 
                  />
                )}

                {geographicAreasMap.length > 0 && (
                  <GeographicAreaFilter 
                    areas={geographicAreasMap} 
                    selected={selectedGeographicAreas} 
                    onToggle={handleGeographicAreaToggle} 
                  />
                )}
              </div>
            </aside>
          </>
        )}

        <section style={{ marginTop: 16 }}>
          {showLoading && <div>Loading images…</div>}
          {error && <div style={{ color: 'crimson' }}>{String(error)}</div>}
          {!showLoading && !isLandingPage && displayImages.length === 0 && (
            <div>
              {hasActiveFilters 
                ? 'No images found matching the selected filters.'
                : images.length === 0 
                  ? 'No images available for this taxon yet.'
                  : 'No images found matching the selected filters.'
              }
            </div>
          )}
          {!showLoading && isLandingPage && displayImages.length === 0 && (
            <div>No images found matching the selected filters.</div>
          )}

          {!showLoading && displayImages.length > 0 && (
            <ImageLabelingGallery 
              images={displayImages}
              isLandingPage={isLandingPage}
              onTaxonClick={isLandingPage ? handleTaxonSelect : null}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default withRouter(ImageLabelingPage);