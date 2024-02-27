import React from 'react';
import { Link } from 'react-router-dom';

import getKey from 'Utilities/getKey';
import { useGetGalleriesQuery } from 'Slices/media';
import Cover from 'Components/Media/Cover';
import Placeholder from 'Components/Placeholder';

import './GalleryCovers.scss';


const defaultProps = {
  coverSize: 140,
};

const GalleryCovers = ({ coverSize }) => {
  const { isFetching, isSuccess, currentData } = (
    useGetGalleriesQuery()
  );

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
          {currentData.map(({ gallery, media }) => (
            <li
              className="gallery-list-item"
              key={getKey('gallery-item', gallery)}
            >
              <Link to={`/gallery/${gallery}/`}>
                <Cover
                  titleText={gallery}
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

GalleryCovers.defaultProps = defaultProps;

export default GalleryCovers;
