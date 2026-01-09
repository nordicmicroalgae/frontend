import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useGetImageLabelingImagesQuery, useGetImageLabelingSummaryQuery } from 'Slices/labeling';
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
            <span>{inst.name} ({inst.count})</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const ImageLabelingPage = ({ location, history }) => {
  // Always initialize from URL
  const taxonFromUrl = new URLSearchParams(location.search).get('taxon');
  const [selectedTaxon, setSelectedTaxon] = React.useState(taxonFromUrl);
  const [selectedInstruments, setSelectedInstruments] = React.useState([]);
  const [selectedInstitutes, setSelectedInstitutes] = React.useState([]);
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);

  // Scroll to top when component mounts
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

  // ONLY sync FROM URL TO STATE (one direction only)
  React.useEffect(() => {
    const urlTaxon = new URLSearchParams(location.search).get('taxon');
    if (urlTaxon !== selectedTaxon) {
      setSelectedTaxon(urlTaxon);
    }
  }, [location.search]);

  const params = React.useMemo(() => {
    const p = {
      limit: 1000,
      fields: ['slug', 'renditions', 'related_taxon', 'taxon', 'attributes', 'file'],
    };
    // Don't send __no_taxon__ to the API - we'll filter client-side instead
    if (selectedTaxon && selectedTaxon !== '__no_taxon__') {
      p.taxon = selectedTaxon;
    }
    return p;
  }, [selectedTaxon]);

  const { data: images = [], isLoading, error, isFetching } = useGetImageLabelingImagesQuery(params);

  // Fetch summary data for filters
  const { data: summary, isLoading: summaryLoading } = useGetImageLabelingSummaryQuery();

  // Extract data from summary
  const instrumentsMap = React.useMemo(() => {
    return summary?.instruments || [];
  }, [summary]);

  const institutesMap = React.useMemo(() => {
    return summary?.institutes || [];
  }, [summary]);

  const taxaMap = React.useMemo(() => {
    if (!summary?.taxa) return [];
    
    // Create a mutable copy before sorting
    return [...summary.taxa].sort((a, b) => {
      if (a.slug === '__no_taxon__') return 1;
      if (b.slug === '__no_taxon__') return -1;
      return String(a.name).localeCompare(String(b.name));
    });
  }, [summary]);

  const taxaList = taxaMap;
  const totalCount = summary?.total_count || 0;

  // Filter images by selected instruments and institutes (for display)
  const filteredImages = React.useMemo(() => {
    let result = images;
    
    // Filter by taxon if __no_taxon__ is selected
    if (selectedTaxon === '__no_taxon__') {
      result = result.filter((img) => !img.relatedTaxon && !img.taxon);
    }
    
    // Filter by instruments
    if (selectedInstruments.length > 0) {
      result = result.filter((img) => {
        const instruments = img.attributes?.imagingInstrument || [];
        const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
        return instrumentArray.some((inst) => selectedInstruments.includes(inst));
      });
    }
    
    // Filter by institutes
    if (selectedInstitutes.length > 0) {
      result = result.filter((img) => {
        const institute = img.attributes?.institute;
        return institute && selectedInstitutes.includes(institute);
      });
    }
    
    return result;
  }, [images, selectedTaxon, selectedInstruments, selectedInstitutes]);

  // Get first image per taxon for landing page
  const firstImagePerTaxon = React.useMemo(() => {
    if (selectedTaxon !== null) return null;
    
    const taxonImages = new Map();
    filteredImages.forEach((img) => {
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
        // Handle images without taxon
        slug = '__no_taxon__';
        name = 'Unknown taxon';
      }
      
      if (slug && !taxonImages.has(slug)) {
        taxonImages.set(slug, { ...img, taxonSlug: slug, taxonName: name });
      }
    });
    
    return Array.from(taxonImages.values()).sort((a, b) => 
      String(a.taxonName).localeCompare(String(b.taxonName))
    );
  }, [filteredImages, selectedTaxon]);

  const handleTaxonSelect = (slug) => {
    setSelectedTaxon(slug);
    setFiltersExpanded(false);
    
    // Update URL immediately in the handler
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
      prev.includes(instrument)
        ? prev.filter((i) => i !== instrument)
        : [...prev, instrument]
    );
  };

  const handleInstituteToggle = (institute) => {
    setSelectedInstitutes((prev) =>
      prev.includes(institute)
        ? prev.filter((i) => i !== institute)
        : [...prev, institute]
    );
  };

  const handleToggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  const isLandingPage = selectedTaxon === null;
  const showLoading = isLoading || isFetching;

  // Get related taxon info from first image (they should all have same taxon on taxon page)
  const relatedTaxon = !isLandingPage && filteredImages.length > 0 ? filteredImages[0].relatedTaxon : null;

  // Fetch facts for taxon page
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
            totalCount={totalCount} 
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
        </div>
      </aside>

      <main className="image-labeling-main">
        {isLandingPage ? (
          <header>
            <h1>Image labeling guide</h1>
            <p>
              Select a taxon from the sidebar to view images and learn about standardized identification and labeling techniques for automated imaging instruments in Nordic waters.
            </p>
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
                    target="_blank"
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
                    More about this taxon ↗
                  </Link>
                </div>
              
                {!factsFetching && aphiaId && (
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: 12 }}>
                    <strong>AphiaID:</strong> {aphiaId}
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
          {!showLoading && filteredImages.length === 0 && <div>No images found matching the selected filters.</div>}

          {!showLoading && filteredImages.length > 0 && (
            <ImageLabelingGallery 
              images={isLandingPage ? firstImagePerTaxon : filteredImages}
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