import React from 'react';
import LightboxMetadata from './LightboxMetadata';
import './ImageLabelingGallery.scss';


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


const LandingGrid = ({ images, onTaxonClick }) => (
  <div className="image-labeling-landing-grid">
    {images.map((img) => {
      const thumb = getThumbUrl(img);
      return (
        <div key={img.taxonSlug || img.id} className="landing-grid-item">
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
              <div className="landing-grid-placeholder">?</div>
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
);


const Lightbox = ({ image, onClose }) => {
  // Prevent body scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on ESC
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="image-labeling-lightbox" onClick={handleBackdropClick}>
      <div className="lightbox-content">
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {getTaxonName(image) && (
          <div className="lightbox-taxon-name">
            <em>{getTaxonName(image)}</em>
          </div>
        )}

        <div className="lightbox-image-container">
          <img
            src={getLargeUrl(image)}
            alt={image.attributes?.title || image.title || image.slug}
          />
        </div>

        {image.attributes?.caption && (
          <div className="lightbox-caption">
            {image.attributes.caption}
          </div>
        )}

        <LightboxMetadata image={image} />
      </div>
    </div>
  );
};


const TaxonGrid = ({ images }) => {
  const [active, setActive] = React.useState(null);

  return (
    <div>
      <div className="taxon-images-grid">
        {images.map((img) => {
          const mediumUrl = getMediumUrl(img);
          return (
            <div key={img.id || img.slug || img.file_url} className="taxon-image-item">
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
                  <div className="taxon-image-placeholder">?</div>
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
        <Lightbox image={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
};


/**
 * Gallery for ImageLabeling images with two modes:
 * - Landing page: Shows one image per taxon with taxon name below
 * - Taxon page: Shows all images for selected taxon in clickable grid
 */
export default function ImageLabelingGallery({ images = [], isLandingPage = false, onTaxonClick = null }) {
  if (isLandingPage) {
    return <LandingGrid images={images} onTaxonClick={onTaxonClick} />;
  }

  return <TaxonGrid images={images} />;
}
