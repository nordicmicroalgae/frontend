import React from 'react';
import { Link } from 'react-router-dom';
import { useGetImageLabelingImagesQuery } from 'Slices/labeling';
import './ImageLabelingPreview.scss';

const ImageLabelingPreview = ({ taxonSlug }) => {
  const { data: images = [], isLoading } = useGetImageLabelingImagesQuery({
    taxon: taxonSlug,
    limit: 6,
    fields: ['slug', 'renditions', 'attributes'],
  });

  if (isLoading) {
    return (
      <>
        <h2>Automated Imaging</h2>
        <div className="image-labeling-loading">Loading automated imaging images...</div>
      </>
    );
  }

  const getThumbUrl = (img) => {
    return img.renditions?.s?.url || img.renditions?.m?.url || img.file;
  };

  return (
    <>
      <div className="image-labeling-header">
        <h2>Automated Imaging</h2>
        {images.length > 0 && (
          <Link to={`/image-labeling/?taxon=${taxonSlug}`} className="image-labeling-see-more">
            See all images →
          </Link>
        )}
      </div>
      
      {images.length === 0 ? (
        <p className="image-labeling-no-images">No automated imaging images available for this taxon.</p>
      ) : (
        <div className="image-labeling-thumbnails">
          {images.map((img) => (
            <Link
              key={img.slug}
              to={`/image-labeling/?taxon=${taxonSlug}`}
              className="thumbnail-item"
            >
              <img
                src={getThumbUrl(img)}
                alt={img.attributes?.title || img.slug}
                className="thumbnail-image"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ImageLabelingPreview;