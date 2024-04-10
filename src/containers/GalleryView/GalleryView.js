import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';

import getKey from 'Utilities/getKey';
import slugify from 'Utilities/slugify';
import { useGetArticleByIdQuery } from 'Slices/articles';
import MediaView, { useMediaQuery } from 'Containers/MediaView';
import Sorters from 'Containers/MediaView/Sorters';
import Frame from 'Components/Media/Frame';


const AvailableSorters = Object.keys(Sorters);

const SortOptions = [
  {label: 'by date', value: undefined},
  ...AvailableSorters.map(
    sorter => ({label: `by ${sorter}`, value: sorter})
  ),
];


const Gallery = ({ selectors }) => {
  const { value } = useParams();

  const { query, params } = useMediaQuery();

  const pageQuery = useGetArticleByIdQuery(
    value
      ? `gallery-${slugify(value)}`
      : 'gallery-latest-images'
  );

  const isActiveSortOption = sortOption =>
    AvailableSorters.includes(params.sort)
      ? sortOption == params.sort
      : sortOption == null

  return (
    <div className="gallery">
      <div className="gallery-header">
        {selectors.title && (
          <h1 className="gallery-title">
            {query.isSuccess && selectors.title(query)}
          </h1>
        )}
        {query.isSuccess && (
          <>
            {pageQuery.isSuccess && (
              <div className="gallery-description">
                <Markdown>
                  {pageQuery.currentData?.content}
                </Markdown>
              </div>
            )}
            <div className="gallery-options">
              <ul className="gallery-sorting-options">
                {SortOptions.map(({label, value}) => (
                  <li key={getKey('sort-option', value ?? 'default')}>
                    <Link
                      to={{
                        search: value
                          ? `sort=${value}`
                          : undefined,
                      }}
                      className={
                        isActiveSortOption(value)
                          ? 'sort-link active'
                          : 'sort-link'
                      }
                      title={`Sort pictures ${label}`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <MediaView.Thumbnails GridItemWrapper={Frame} />
      <MediaView.DetailsDialog />
    </div>
  );
};

Gallery.defaultProps = {
  selectors: {
    title: query => query.originalArgs.gallery ?? 'All images'
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scope, value } = useParams();

  const ScopedComponent = scope ? ScopedGallery[scope] : Gallery;

  const scopedQuery = {
    [scope ?? 'gallery']: value
      ? decodeURIComponent(value)
      : undefined
  };

  return (
    <MediaView query={scopedQuery}>
      <ScopedComponent />
    </MediaView>
  );
};


export default GalleryView;
