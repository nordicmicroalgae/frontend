import React from 'react';
import { Link } from 'react-router-dom';

import getKey from 'Utilities/getKey';
import { useGetGalleriesQuery } from 'Slices/media';
import Cover from 'Components/Media/Cover';
import { getSubgalleries } from './gallery-tree';

import './GalleryCovers.scss';


/**
 * Renders subgallery covers for a parent gallery.
 * Shown at the top of a gallery page when the gallery has subgalleries.
 */
const SubgalleryCovers = ({ parentGallery, coverSize = 140 }) => {
  const { isSuccess, currentData } = useGetGalleriesQuery();

  if (!isSuccess || !currentData) {
    return null;
  }

  const subgalleries = getSubgalleries(currentData, parentGallery);

  if (subgalleries.length === 0) {
    return null;
  }

  return (
    <section className="galleries subgalleries">
      <h2 className="subgalleries-heading">Subgalleries</h2>
      <ul
        className="gallery-list"
        style={{
          '--cover-size': coverSize,
        }}
      >
        {subgalleries.map(({ gallery, displayName, media }) => (
          <li
            className="gallery-list-item"
            key={getKey('subgallery-item', gallery)}
          >
            <Link
              to={`/gallery/${encodeURIComponent(parentGallery)}/${encodeURIComponent(displayName)}/`}
            >
              <Cover
                titleText={displayName}
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
  );
};


export default SubgalleryCovers;
