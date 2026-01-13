import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useGetImageLabelingImagesQuery, useGetImageLabelingSummaryQuery, useGetImageLabelingFirstPerTaxonQuery } from 'Slices/labeling';
import { useGetFactsQuery } from 'Slices/facts';

import ImageLabelingGallery from 'Components/ImageLabeling/ImageLabelingGallery';
import ScientificName from 'Components/ScientificName';
import Authority from 'Components/Authority';
import './ImageLabelingPage.scss';

const SidebarTaxonList = ({ taxa, selected, onSelect, totalCount }) => (
  <div style={{ marginBottom: 24 }}>
    <h4 style={{ paddingLeft: 12, marginBottom: 8 }}>Available taxa</h4>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li key="all">
        <button
          onClick={() => onSelect(null)}
          style={{
            background: selected == null ? '#efefef' : 'transparent',
            border: 'none',
            padding: '6px 8px 6px 12px',
            width: '100%',
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          All taxa ({taxa.length})
        </button>
      </li>
      {taxa.map((t) => (
        <li key={t.slug}>
          <button
            onClick={() => onSelect(t.slug)}
            style={{
              background: selected === t.slug ? '#efefef' : 'transparent',
              border: 'none',
              padding: '6px 8px 6px 12px',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            {t.slug === '__no_taxon__' ? (
              <span>{t.name || 'Unknown taxon'}</span>
            ) : (
              <span style={{ fontStyle: 'italic' }}>
                {t.name || t.slug}
              </span>
            )}
            {' '}({t.count || 0})
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const InstrumentFilter = ({ instruments, selected, onToggle }) => (
  <div style={{ marginBottom: 24 }}>
    <h4 style={{ paddingLeft: 12, marginBottom: 8 }}>Imaging instruments</h4>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {instruments.map((inst) => (
        <li key={inst.name} style={{ paddingLeft: 12, marginBottom: 4 }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selected.includes(inst.name)}
              onChange={() => onToggle(inst.name)}
              style={{ marginRight: 8 }}
            />
            <span>{inst.name} ({inst.count})</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const InstituteFilter = ({ institutes, selected, onToggle }) => (
  <div style={{ marginBottom: 24 }}>
    <h4 style={{ paddingLeft: 12, marginBottom: 8 }}>Institutes</h4>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {institutes.map((inst) => (
        <li key={inst.name} style={{ paddingLeft: 12, marginBottom: 4 }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selected.includes(inst.name)}
              onChange={() => onToggle(inst.name)}
              style={{ marginRight: 8 }}
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
  <div style={{ marginBottom: 24 }}>
    <h4 style={{ paddingLeft: 12, marginBottom: 8 }}>Geographic areas</h4>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {areas.map((area) => (
        <li key={area.name} style={{ paddingLeft: 12, marginBottom: 4 }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selected.includes(area.name)}
              onChange={() => onToggle(area.name)}
              style={{ marginRight: 8 }}
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
      document.body.classList.add('has-expanded-filters');
    } else {
      document.body.classList.remove('has-expanded-filters');
    }
    return () => {
      document.body.classList.remove('has-expanded-filters');
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
    if (selectedTaxon && selectedTaxon !== '__no_taxon__') {
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
        
        // Check if "__not_specified__" is selected and image has no institute
        if (selectedInstitutes.includes('__not_specified__') && (!img.attributes?.institute || instituteArray.length === 0)) {
          return true;
        }
        
        return instituteArray.some((inst) => selectedInstitutes.includes(inst));
      });
    }
    
    if (selectedGeographicAreas.length > 0) {
      result = result.filter((img) => {
        const area = img.attributes?.geographicArea;
        
        // Check if "__not_specified__" is selected and image has no area
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
        slug = '__no_taxon__';
        name = 'Unknown taxon';
      }

      const entry = map.get(slug) || { slug, name, count: 0 };
      entry.count += 1;
      map.set(slug, entry);
    });
    
    return Array.from(map.values()).sort((a, b) => {
      if (a.slug === '__no_taxon__') return 1;
      if (b.slug === '__no_taxon__') return -1;
      return String(a.name).localeCompare(String(b.name));
    });
  }, [filteredAllImages, hasActiveFilters]);

  // Use summary taxa when no filters, filtered taxa when filters active
  const taxaList = React.useMemo(() => {
    if (hasActiveFilters) {
      return filteredTaxaMap;
    }
    
    // Create a mutable copy before sorting (Redux data is immutable)
    return [...(summary?.taxa || [])].sort((a, b) => {
      if (a.slug === '__no_taxon__') return 1;
      if (b.slug === '__no_taxon__') return -1;
      return String(a.name).localeCompare(String(b.name));
    });
  }, [hasActiveFilters, filteredTaxaMap, summary]);

  const instrumentsMap = summary?.instruments || [];
  const institutesMap = summary?.institutes || [];
  const geographicAreasMap = summary?.geographic_areas || [];

  // Filter taxon page images
  const filteredImages = React.useMemo(() => {
    let result = images;
    
    if (selectedTaxon === '__no_taxon__') {
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
        
        // Check if "__not_specified__" is selected and image has no institute
        if (selectedInstitutes.includes('__not_specified__') && (!img.attributes?.institute || instituteArray.length === 0)) {
          return true;
        }
        
        return instituteArray.some((inst) => selectedInstitutes.includes(inst));
      });
    }
    
    if (selectedGeographicAreas.length > 0) {
      result = result.filter((img) => {
        const area = img.attributes?.geographicArea;
        
        // Check if "__not_specified__" is selected and image has no area
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
          slug = '__no_taxon__';
          name = 'Unknown taxon';
        }
      }
      
      // Only keep the image with the lowest priority for each taxon
      const existing = taxonImages.get(slug);
      
      // If no existing image, or current image has lower priority, use current image
      if (!existing) {
        taxonImages.set(slug, {
          ...img,
          taxonSlug: slug,
          taxonName: name,
        });
      } else if (img.priority != null && existing.priority != null) {
        // Both have priorities - compare them
        if (img.priority < existing.priority) {
          taxonImages.set(slug, {
            ...img,
            taxonSlug: slug,
            taxonName: name,
          });
        }
      } else if (img.priority != null && existing.priority == null) {
        // Current has priority, existing doesn't - prefer current
        taxonImages.set(slug, {
          ...img,
          taxonSlug: slug,
          taxonName: name,
        });
      }
      // else: existing has priority and current doesn't, keep existing
    });
    
    // Sort alphabetically, with Unknown taxon at the end
    return Array.from(taxonImages.values()).sort((a, b) => {
      if (a.taxonSlug === '__no_taxon__') return 1;
      if (b.taxonSlug === '__no_taxon__') return -1;
      return String(a.taxonName).localeCompare(String(b.taxonName));
    });
  }, [isLandingPage, hasActiveFilters, filteredAllImages, landingImages]);

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

  const showLoading = isLandingPage ? landingLoading : (isLoading || isFetching);
  const relatedTaxon = !isLandingPage && images.length > 0 ? images[0].relatedTaxon : null;

  const { data: facts, isFetching: factsFetching } = useGetFactsQuery(relatedTaxon?.slug, {
    skip: !relatedTaxon?.slug,
  });

  const aphiaId = React.useMemo(() => {
    if (!facts) return null;
    const wormsLink = facts.find(
      (fact) => fact.provider === 'WoRMS' && fact.collection === 'External Links'
    );
    return wormsLink?.attributes?.[0]?.externalId || null;
  }, [facts]);

  const displayImages = isLandingPage ? firstImagePerTaxon : filteredImages;

  return (
    <div className="container image-labeling-page">
      <button
        type="button"
        className="filters-toggle"
        onClick={handleToggleFilters}
        aria-controls="filters-navigation"
        aria-expanded={filtersExpanded}
      >
        <span className="filters-toggle-bar" />
        <span className="filters-toggle-bar" />
        <span className="filters-toggle-bar" />
      </button>

      <aside id="filters-navigation" className="image-labeling-filters">
        <div className="filters-content">
          <h2 className="image-labeling-filters-heading">Filters</h2>
          <SidebarTaxonList 
            taxa={taxaList} 
            selected={selectedTaxon} 
            onSelect={handleTaxonSelect} 
            totalCount={taxaList.length}
          />
          
          <InstrumentFilter 
            instruments={instrumentsMap} 
            selected={selectedInstruments} 
            onToggle={handleInstrumentToggle} 
          />
          
          <InstituteFilter 
            institutes={institutesMap} 
            selected={selectedInstitutes} 
            onToggle={handleInstituteToggle} 
          />

          <GeographicAreaFilter 
            areas={geographicAreasMap} 
            selected={selectedGeographicAreas} 
            onToggle={handleGeographicAreaToggle} 
          />
        </div>
      </aside>

      <main className="image-labeling-main">
        {isLandingPage ? (
          <header>
            <h1>Image labeling guide</h1>
            <p>
              Select a taxon from the sidebar to view images and learn about standardized identification and labeling techniques for automated imaging instruments in Nordic waters
            </p>
            <p style={{ marginTop: '12px' }}>
              If you notice an incorrectly labeled image, please contact the contributor directly or email{' '}
              <a href="mailto:nordicmicroalgae@smhi.se" style={{ color: '#0066cc' }}>
                nordicmicroalgae@smhi.se
              </a>
              . To contribute your own images, visit our{' '}
              <Link to="/how-to-contribute/" style={{ color: '#0066cc' }}>
                contribution guidelines
              </Link>
              .
            </p>
          </header>
        ) : selectedTaxon === '__no_taxon__' ? (
          <header style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e0e0e0' }}>
            <h1 style={{ fontSize: '28px', marginBottom: 8 }}>
              Unknown taxon
            </h1>
            
            <div style={{ fontSize: '14px', color: '#333', marginTop: 12 }}>
              These images have not been assigned to a taxon yet.
            </div>
          </header>
        ) : (
          !showLoading && relatedTaxon && (
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

        <section style={{ marginTop: 16 }}>
          {showLoading && <div>Loading images…</div>}
          {error && <div style={{ color: 'crimson' }}>{String(error)}</div>}
          {!showLoading && displayImages.length === 0 && <div>No images found matching the selected filters.</div>}

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