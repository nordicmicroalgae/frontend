import React from 'react';
import { useParams } from 'react-router-dom';


import MediaView, { useMediaQuery } from 'Containers/MediaView';
import Frame from 'Components/Media/Frame';


const Gallery = ({ selectors }) => {
  const { query } = useMediaQuery();

  return (
    <div className="gallery">
      {selectors.title && (
        <h1 className="gallery-title">
          {query.isSuccess && selectors.title(query)}
        </h1>
      )}
      {selectors.description && (
        <p className="gallery-description">
          {query.isSuccess && selectors.description(query)}
        </p>
      )}
      <MediaView.Thumbnails GridItemWrapper={Frame} />
      <MediaView.DetailsDialog />
    </div>
  );
};

Gallery.defaultProps = {
  selectors: {
    title: query => query.originalArgs.gallery ?? 'Latest images'
  },
};

const ArtistGallery = () => (
  <Gallery
    selectors={{
      title: query => 
        `Illustrations by ${query.originalArgs.artist}`,
    }}
  />
);

const ScopedGallery = {
  artist: ArtistGallery,
};


const GalleryView = () => {
  const { scope, value } = useParams();

  const ScopedComponent = scope ? ScopedGallery[scope] : Gallery;

  const scopedQuery = { [scope ?? 'gallery']: value };

  return (
    <MediaView query={scopedQuery}>
      <ScopedComponent />
    </MediaView>
  );
};


export default GalleryView;
