import React from 'react';
import { Link } from 'react-router-dom';


export const GalleryLink = ({ field, value }) => (
  field == 'photographerArtist' ? (
    <Link to={`/gallery/artist/${value}/`}>
      {value}
    </Link>
  ) : (
    <Link to={`/gallery/${value}/`}>
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
