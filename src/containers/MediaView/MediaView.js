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
  })
}

const MediaView = ({ query, children }) => {
  return (
    <MediaQueryProvider queryArgs={query}>
      <div className="media-view">
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
