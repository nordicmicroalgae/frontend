import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useGetImageLabelingImagesQuery } from 'Slices/labeling';
import { useGetFactsQuery } from 'Slices/facts';

import ImageLabelingGallery from 'Components/ImageLabeling/ImageLabelingGallery';
import ScientificName from 'Components/ScientificName';
import Authority from 'Components/Authority';

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
          All ({totalCount})
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
            <span style={{ fontStyle: 'italic' }}>
              {t.name || t.slug}
            </span>
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

const ImageLabelingPage = ({ location, history }) => {
  // Parse query parameter from URL
  const queryParams = new URLSearchParams(location.search);
  const taxonFromUrl = queryParams.get('taxon');
  
  // Initialize selectedTaxon from URL parameter
  const [selectedTaxon, setSelectedTaxon] = React.useState(taxonFromUrl);
  
  const [selectedInstruments, setSelectedInstruments] = React.useState([]);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update URL when taxon selection changes
  React.useEffect(() => {
    const newParams = new URLSearchParams();
    if (selectedTaxon) {
      newParams.set('taxon', selectedTaxon);
      history.push({ search: newParams.toString() });
    } else {
      history.push({ search: '' });
    }
  }, [selectedTaxon, history]);

  const params = React.useMemo(() => {
    const p = {
      limit: 1000,
      fields: ['slug', 'renditions', 'related_taxon', 'taxon', 'attributes', 'file'],
    };
    if (selectedTaxon) p.taxon = selectedTaxon;
    return p;
  }, [selectedTaxon]);

  const { data: images = [], isLoading, error, isFetching } = useGetImageLabelingImagesQuery(params);

  // Fetch all images without filter to get the total count
  const { data: allImages = [] } = useGetImageLabelingImagesQuery({
    limit: 1000,
    fields: ['slug', 'related_taxon', 'taxon', 'attributes'],
  });

  // Extract unique imaging instruments with counts (from all images)
  const instrumentsMap = React.useMemo(() => {
    const map = new Map();
    allImages.forEach((img) => {
      const instruments = img.attributes?.imagingInstrument || [];
      const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
      
      instrumentArray.forEach((inst) => {
        if (inst) {
          const entry = map.get(inst) || { name: inst, count: 0 };
          entry.count += 1;
          map.set(inst, entry);
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allImages]);

  // Filter all images by selected instruments (for calculating taxon counts)
  const filteredAllImages = React.useMemo(() => {
    if (selectedInstruments.length === 0) {
      return allImages;
    }
    
    return allImages.filter((img) => {
      const instruments = img.attributes?.imagingInstrument || [];
      const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
      
      return instrumentArray.some((inst) => selectedInstruments.includes(inst));
    });
  }, [allImages, selectedInstruments]);

  // Build taxon map from filtered images
  const taxaMap = React.useMemo(() => {
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
        name = 'No taxon';
      }

      const entry = map.get(slug) || { slug, name, count: 0 };
      entry.count += 1;
      map.set(slug, entry);
    });
    return Array.from(map.values()).sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }, [filteredAllImages]);

  const taxaList = taxaMap.filter((t) => t.slug !== '__no_taxon__');
  const totalCount = filteredAllImages.length;

  // Filter images by selected instruments (for display)
  const filteredImages = React.useMemo(() => {
    if (selectedInstruments.length === 0) {
      return images;
    }
    
    return images.filter((img) => {
      const instruments = img.attributes?.imagingInstrument || [];
      const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
      
      return instrumentArray.some((inst) => selectedInstruments.includes(inst));
    });
  }, [images, selectedInstruments]);

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
      }
      
      if (slug && !taxonImages.has(slug)) {
        taxonImages.set(slug, { ...img, taxonSlug: slug, taxonName: name });
      }
    });
    
    return Array.from(taxonImages.values()).sort((a, b) => 
      String(a.taxonName).localeCompare(String(b.taxonName))
    );
  }, [filteredImages, selectedTaxon]);

  const handleInstrumentToggle = (instrument) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument)
        ? prev.filter((i) => i !== instrument)
        : [...prev, instrument]
    );
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
    <div
      className="container image-labeling-page"
      style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: 24,
        alignItems: 'start',
      }}
    >
      {/* Sticky sidebar */}
      <aside
        style={{
          position: 'sticky',
          top: 16,
          height: 'calc(100vh - 32px)',
          overflowY: 'auto',
          borderRight: '1px solid #e0e0e0',
          paddingRight: 12,
          paddingLeft: 12,
        }}
      >
        <SidebarTaxonList taxa={taxaList} selected={selectedTaxon} onSelect={setSelectedTaxon} totalCount={totalCount} />
        
        <InstrumentFilter 
          instruments={instrumentsMap} 
          selected={selectedInstruments} 
          onToggle={handleInstrumentToggle} 
        />
      </aside>

      {/* Main content */}
      <main style={{ minWidth: 0 }}>
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
              onTaxonClick={isLandingPage ? setSelectedTaxon : null}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default withRouter(ImageLabelingPage);