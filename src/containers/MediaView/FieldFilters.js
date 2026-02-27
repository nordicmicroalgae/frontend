import React from 'react';
import { Link } from 'react-router-dom';


const galleryPath = (galleryName) => {
  const slashIndex = galleryName.indexOf('/');

  if (slashIndex === -1) {
    return `/gallery/${encodeURIComponent(galleryName)}/`;
  }

  const parent = galleryName.substring(0, slashIndex);
  const child = galleryName.substring(slashIndex + 1);

  return `/gallery/${encodeURIComponent(parent)}/${encodeURIComponent(child)}/`;
};


export const GalleryLink = ({ field, value }) => (
  field == 'photographerArtist' ? (
    <Link to={`/gallery/artist/${value}/`}>
      {value}
    </Link>
  ) : (
    <Link to={galleryPath(value)}>
      {value}
    </Link>
  )
);

GalleryLink.appliesTo = [
  'galleries',
  'photographerArtist'
];

export const FormattedDate = ({ value }) => {
  try {
    const date = new Date(value.toString())
    return date.toLocaleDateString();
  } catch {
    return value;
  }
};

FormattedDate.appliesTo = ['createdAt'];


// all filters, weighted order
export const filters = [
    FormattedDate,
    GalleryLink,
];
