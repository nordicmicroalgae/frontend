import React from 'react';
import './ImageLabelingGallery.scss';

/**
 * Gallery for ImageLabeling images with two modes:
 * - Landing page: Shows one image per taxon with taxon name below
 * - Taxon page: Shows all images for selected taxon in clickable grid
 */
export default function ImageLabelingGallery({ images = [], isLandingPage = false, onTaxonClick = null }) {
  
  function getThumbUrl(item) {
    return (
      (item.renditions && (item.renditions.s?.url || item.renditions.o?.url)) ||
      item.file_url ||
      (item.file && item.file.url) ||
      null
    );
  }

  function getMediumUrl(item) {
    return (
      (item.renditions && (item.renditions.m?.url || item.renditions.o?.url)) ||
      item.file_url ||
      (item.file && item.file.url) ||
      null
    );
  }

  function getLargeUrl(item) {
    return (
      (item.renditions && (item.renditions.l?.url || item.renditions.m?.url || item.renditions.o?.url)) ||
      item.file_url ||
      (item.file && item.file.url) ||
      null
    );
  }

  function getTaxonName(item) {
    const taxonObj = item.relatedTaxon || item.taxon;
    if (!taxonObj) return null;
    
    if (typeof taxonObj === 'object') {
      return taxonObj.scientificName || taxonObj.name || taxonObj.text || taxonObj.slug;
    }
    return taxonObj;
  }

  const [active, setActive] = React.useState(null);

  // Prevent body scroll when lightbox is open
  React.useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  // Close lightbox with ESC key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && active) {
        setActive(null);
      }
    };

    if (active) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [active]);

  if (isLandingPage) {
    // Landing page view: one image per taxon with taxon name
    return (
      <div>
        <div className="image-labeling-landing-grid">
          {images.map((img) => {
            const thumb = getThumbUrl(img);
            return (
              <div
                key={img.taxonSlug || img.id}
                className="landing-grid-item"
              >
                <button
                  onClick={() => onTaxonClick && onTaxonClick(img.taxonSlug)}
                  className="landing-grid-image-button"
                >
                  {thumb ? (
                    <img 
                      src={thumb} 
                      alt={img.taxonName || img.slug} 
                      className="landing-grid-image"
                    />
                  ) : (
                    <div className="landing-grid-placeholder">
                      ?
                    </div>
                  )}
                </button>
                <button
                  onClick={() => onTaxonClick && onTaxonClick(img.taxonSlug)}
                  className="landing-grid-taxon-name"
                >
                  {img.taxonName || 'Unknown taxon'}
                  {img.imageCount > 0 && (
                    <span className="landing-grid-image-count"> ({img.imageCount})</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Taxon page view: full-size images in masonry-style grid
  return (
    <div>
      <div className="taxon-images-grid">
        {images.map((img) => {
          const mediumUrl = getMediumUrl(img);
          return (
            <div
              key={img.id || img.slug || img.file_url}
              className="taxon-image-item"
            >
              <button
                onClick={() => setActive(img)}
                className="taxon-image-button"
              >
                {mediumUrl ? (
                  <img 
                    src={mediumUrl} 
                    alt={img.title || img.slug}
                    className="taxon-image"
                  />
                ) : (
                  <div className="taxon-image-placeholder">
                    ?
                  </div>
                )}
              </button>
              <div className="taxon-image-title">
                {img.attributes?.title || img.title || 'Untitled'}
              </div>
              {img.attributes?.institute && (
                <div className="taxon-image-institute">
                  {img.attributes.institute}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {active && (
        <div
          className="image-labeling-lightbox"
          onClick={(e) => {
            // Only close if clicking the backdrop, not the content
            if (e.target.className === 'image-labeling-lightbox') {
              setActive(null);
            }
          }}
        >
          <div className="lightbox-content">
            <button 
              className="lightbox-close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
            
            {getTaxonName(active) && (
              <div className="lightbox-taxon-name">
                <em>{getTaxonName(active)}</em>
              </div>
            )}
            
            <div className="lightbox-image-container">
              <img
                src={getLargeUrl(active)}
                alt={active.attributes?.title || active.title || active.slug}
              />
            </div>

            {active.attributes?.caption && (
              <div className="lightbox-caption">
                {active.attributes.caption}
              </div>
            )}

            <div className="lightbox-metadata">
              {active.attributes?.title && (
                <div className="metadata-row">
                  <span className="metadata-label">Class name:</span>
                  <span className="metadata-value">{active.attributes.title}</span>
                </div>
              )}
              
              {active.attributes?.imagingInstrument && (
                <div className="metadata-row">
                  <span className="metadata-label">Imaging instrument:</span>
                  <span className="metadata-value">
                    {Array.isArray(active.attributes.imagingInstrument) 
                      ? active.attributes.imagingInstrument.join(', ')
                      : active.attributes.imagingInstrument}
                  </span>
                </div>
              )}

              {active.attributes?.contributor && (
                <div className="metadata-row">
                  <span className="metadata-label">Contributor:</span>
                  <span className="metadata-value">{active.attributes.contributor}</span>
                </div>
              )}
              
              {active.attributes?.institute && (
                <div className="metadata-row">
                  <span className="metadata-label">Institute:</span>
                  <span className="metadata-value">{active.attributes.institute}</span>
                </div>
              )}
              
              {active.attributes?.trainingDataset && (
                <div className="metadata-row">
                  <span className="metadata-label">Training dataset DOI:</span>
                  <span className="metadata-value">
                    {active.attributes.trainingDataset.startsWith('http://') || 
                    active.attributes.trainingDataset.startsWith('https://') ||
                    active.attributes.trainingDataset.startsWith('doi:') ? ( <a
                      
                        href={
                          active.attributes.trainingDataset.startsWith('doi:')
                            ? `https://doi.org/${active.attributes.trainingDataset.slice(4)}`
                            : active.attributes.trainingDataset
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0066cc', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {active.attributes.trainingDataset}
                      </a>
                    ) : (
                      active.attributes.trainingDataset
                    )}
                  </span>
                </div>
              )}

              {active.attributes?.geographicArea && (
                <div className="metadata-row">
                  <span className="metadata-label">Geographic area:</span>
                  <span className="metadata-value">
                    {Array.isArray(active.attributes.geographicArea) 
                      ? active.attributes.geographicArea.join(', ')
                      : active.attributes.geographicArea}
                  </span>
                </div>
              )}

              {active.attributes?.location && (
                <div className="metadata-row">
                  <span className="metadata-label">Location:</span>
                  <span className="metadata-value">
                    {Array.isArray(active.attributes.location) 
                      ? active.attributes.location.join(', ')
                      : active.attributes.location}
                  </span>
                </div>
              )}

              {active.attributes?.latitudeDegree && (
                <div className="metadata-row">
                  <span className="metadata-label">Latitude:</span>
                  <span className="metadata-value">
                    {Array.isArray(active.attributes.latitudeDegree) 
                      ? active.attributes.latitudeDegree.join(', ')
                      : active.attributes.latitudeDegree}
                  </span>
                </div>
              )}

              {active.attributes?.longitudeDegree && (
                <div className="metadata-row">
                  <span className="metadata-label">Longitude:</span>
                  <span className="metadata-value">
                    {Array.isArray(active.attributes.longitudeDegree) 
                      ? active.attributes.longitudeDegree.join(', ')
                      : active.attributes.longitudeDegree}
                  </span>
                </div>
              )}

              {active.attributes?.samplingDate && (
                <div className="metadata-row">
                  <span className="metadata-label">Sampling date:</span>
                  <span className="metadata-value">
                    {Array.isArray(active.attributes.samplingDate)
                      ? active.attributes.samplingDate.join(', ')
                      : active.attributes.samplingDate}
                  </span>
                </div>
              )}

              {active.createdAt && (
                <div className="metadata-row">
                  <span className="metadata-label">Upload date:</span>
                  <span className="metadata-value">
                    {active.createdAt.split('T')[0]}
                  </span>
                </div>
              )}

              {active.attributes?.copyrightHolder && (
                <div className="metadata-row">
                  <span className="metadata-label">Copyright holder:</span>
                  <span className="metadata-value">
                    {Array.isArray(active.attributes.copyrightHolder) 
                      ? active.attributes.copyrightHolder.join(', ')
                      : active.attributes.copyrightHolder}
                  </span>
                </div>
              )}

              {active.attributes?.license && (
                <div className="metadata-row">
                  <span className="metadata-label">License:</span>
                  <span className="metadata-value">
                    {Array.isArray(active.attributes.license) 
                      ? active.attributes.license.join(', ')
                      : active.attributes.license}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}