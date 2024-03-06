import React from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import slugify from 'Utilities/slugify';
import { useGetArticleByIdQuery } from 'Slices/articles';
import MediaView, { useMediaQuery } from 'Containers/MediaView';
import Frame from 'Components/Media/Frame';


const Gallery = ({ selectors }) => {
  const { value } = useParams();

  const { query } = useMediaQuery();

  const pageQuery = useGetArticleByIdQuery(
    `galleries-${slugify(value)}`
  );

  return (
    <div className="gallery">
      <div className="gallery-header">
        {selectors.title && (
          <h1 className="gallery-title">
            {query.isSuccess && selectors.title(query)}
          </h1>
        )}
        {(query.isSuccess && pageQuery.isSuccess) && (
          <div className="gallery-description">
            <Markdown>
              {pageQuery.currentData?.content}
            </Markdown>
          </div>
        )}
      </div>
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
