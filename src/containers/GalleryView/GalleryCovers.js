import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import getKey from 'Utilities/getKey';
import { useGetGalleriesQuery } from 'Slices/media';
import Cover from 'Components/Media/Cover';
import Placeholder from 'Components/Placeholder';
import { getTopLevelGalleries } from './gallery-tree';

import './GalleryCovers.scss';



const GalleryCovers = ({ coverSize = 140 }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isFetching, isSuccess, currentData } = (
    useGetGalleriesQuery()
  );

  const topLevel = isSuccess
    ? getTopLevelGalleries(currentData)
    : [];

  return (
    isFetching ? (
      <section className="galleries is-loading">
        <h1>
          <Placeholder />
        </h1>
        <ul
          className="gallery-list"
          style={{
            '--cover-size': coverSize,
          }}
        >
          {(new Array(10).fill(null).map((_n, index) => (
            <li
              className="gallery-list-item"
              key={getKey('gallery-placeholder', index)}
            >
              <Placeholder />
            </li>
          )))}
        </ul>
      </section>
    ) :
    isSuccess ? (
      <section className="galleries">
        <h1>Galleries</h1>
        <ul
          className="gallery-list"
          style={{
            '--cover-size': coverSize,
          }}
        >
          {topLevel.map(({ gallery, media, hasChildren }) => (
            <li
              className="gallery-list-item"
              key={getKey('gallery-item', gallery ?? 'all')}
            >
              <Link to={`/gallery/${gallery ?? 'all'}/`}>
                <Cover
                  titleText={
                    (gallery ?? 'All images')
                    + (hasChildren ? ' \u25B8' : '')
                  }
                  thumbnails={media.map(
                    ({ slug, renditions }) => ({
                      key: slug,
                      thumbnailUrl: renditions.s.url,
                      previewUrl: renditions.p.url,
                    })
                  )}
                  size={coverSize}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    ) :
    null
  );
};


export default GalleryCovers;
