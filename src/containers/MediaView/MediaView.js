import React from 'react';
import PropTypes from 'prop-types';

import { MediaQueryProvider } from './media-context';
import MediaDetailsView from './MediaDetailsView';
import MediaDetailsDialog from './MediaDetailsDialog';
import MediaSetView from './MediaSetView';


const propTypes = {
  query: PropTypes.shape({
    artist: PropTypes.string,
    gallery: PropTypes.string,
    limit: PropTypes.number,
  }),
  heading: PropTypes.string,
};

const defaultProps = {
  heading: null
};

const MediaView = ({ query, children, heading }) => {
  return (
    <MediaQueryProvider queryArgs={query}>
      <div className="media-view">
        {heading && <h2>{heading}</h2>}
        {children}
      </div>
    </MediaQueryProvider>
  );
};

MediaView.propTypes = propTypes;

MediaView.Details = MediaDetailsView;
MediaView.DetailsDialog = MediaDetailsDialog;
MediaView.Thumbnails = MediaSetView;

export default MediaView;
