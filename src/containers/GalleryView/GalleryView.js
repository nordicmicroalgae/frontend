import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';

import getKey from 'Utilities/getKey';
import slugify from 'Utilities/slugify';
import { useGetArticleByIdQuery } from 'Slices/articles';
import MediaView, { useMediaQuery } from 'Containers/MediaView';
import Sorters from 'Containers/MediaView/Sorters';
import Frame from 'Components/Media/Frame';
import SubgalleryCovers from './SubgalleryCovers';


const KnownScopes = new Set(['artist']);

const AvailableSorters = Object.keys(Sorters);

const SortOptions = [
  {label: 'by date', value: undefined},
  ...AvailableSorters.map(
    sorter => ({label: `by ${sorter}`, value: sorter})
  ),
];


const Gallery = ({ selectors = { title: query => query.originalArgs.gallery ?? 'All images' } }) => {
  const { scope, value } = useParams();

  const { query, params } = useMediaQuery();

  // Determine the gallery name for article lookup and subgallery detection
  const galleryName = (scope && !KnownScopes.has(scope))
    ? (value
        ? `${decodeURIComponent(scope)}/${decodeURIComponent(value)}`
        : decodeURIComponent(scope))
    : (value ? decodeURIComponent(value) : undefined);

  const parentGallery = (scope && !KnownScopes.has(scope) && !value)
    ? decodeURIComponent(scope)
    : (!scope && value)
      ? decodeURIComponent(value)
      : undefined;

  const pageQuery = useGetArticleByIdQuery(
    galleryName
      ? `gallery-${slugify(galleryName)}`
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
            {parentGallery && (
              <SubgalleryCovers parentGallery={parentGallery} />
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

  // Determine if scope is a known scope (like "artist") or a parent gallery name
  const isKnownScope = scope && KnownScopes.has(scope);

  const ScopedComponent = isKnownScope ? ScopedGallery[scope] : Gallery;

  let scopedQuery;

  if (isKnownScope) {
    // Known scope: e.g. /gallery/artist/SomeName/
    scopedQuery = {
      [scope]: value ? decodeURIComponent(value) : undefined,
    };
  } else if (scope && value) {
    // Subgallery: e.g. /gallery/Baltic%20Proper/Cyanobacteria/
    const parentGallery = decodeURIComponent(scope);
    const subGallery = decodeURIComponent(value);
    scopedQuery = {
      gallery: `${parentGallery}/${subGallery}`,
    };
  } else if (scope) {
    // Top-level gallery via scope param: e.g. /gallery/Baltic%20Proper/
    // React Router with /:scope?/:value/ fills scope first when only one segment
    // But actually with optional scope, one segment fills value. Let's handle both.
    scopedQuery = {
      gallery: decodeURIComponent(scope),
    };
  } else if (value) {
    // Top-level gallery: e.g. /gallery/Baltic%20Proper/
    scopedQuery = {
      gallery: decodeURIComponent(value),
    };
  } else {
    // "All images": /gallery/all/
    scopedQuery = {
      exclude_galleries: 'Citizen science',
    };
  }

  return (
    <MediaView query={scopedQuery}>
      <ScopedComponent />
    </MediaView>
  );
};


export default GalleryView;
