import React from 'react';
import PropTypes from 'prop-types';

import getKey from 'Utilities/getKey';


const propTypes = {
  titleText: PropTypes.string.isRequired,
  thumbnails: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      previewUrl: PropTypes.string,
      thumbnailUrl: PropTypes.string.isRequired,
    }).isRequired,
  ),
  size: PropTypes.number,
};

const defaultProps = {
  size: 200,
};


const Cover = ({titleText, thumbnails, size}) => {
  return (
    <div
      className="media-cover"
      style={{
        '--cover-size': size,
      }}
    >
      <h2 className="media-cover-title">
        {titleText}
      </h2>
      <div className="media-cover-thumbnails">
        {thumbnails.map(
          ({key, previewUrl, thumbnailUrl}) => (
            <div
              className="media-cover-preview"
              key={getKey('cover-thumbnail', key)}
              style={{
                backgroundImage: previewUrl
                  ? `url(${previewUrl})`
                  : undefined
              }}
            >
              <div
                className="media-cover-thumbnail"
                style={{
                  backgroundImage: `url(${thumbnailUrl})`
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

Cover.propTypes = propTypes;

Cover.defaultProps = defaultProps;

export default Cover;
