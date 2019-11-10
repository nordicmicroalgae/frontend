import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

const propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  title: PropTypes.string,
  caption: PropTypes.string,
  backgroundColor: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

const defaultProps = {
  width: 640,
  backgroundColor: '#f0f0f0'
};

const Picture = ({ src, width, title, caption, backgroundColor, children, onLoad, onError }) => {

  let [ imageSrc, setImageSrc ] = useState(undefined);

  const defaultLoadHandler = (event) => {
    setImageSrc(event.target.src);
  };

  const defaultErrorHandler = (event) => {
    setImageSrc(false);
  };

  if (imageSrc !== false) {
    let image = new Image();

    image.src = src;

    image.onload = (event) => {
      if (onLoad) {
        return onLoad(event, defaultLoadHandler);
      }
      return defaultLoadHandler(event);
    };

    image.onerror = () => {
      if (onError) {
        return onError(event, defaultErrorHandler);
      }
      return defaultErrorHandler(event);
    };
  }

  return (
    <div className="picture-container" style={{width: `${width}px`}}>
      <div className="picture" style={{ backgroundColor }}>
        <div className="picture-source">
          {imageSrc == null &&(
            <Spinner />
          )}
          {imageSrc === false && (
            <p>Image not available</p>
          )}
          {imageSrc && (
            <img src={imageSrc} />
          )}
        </div>
      </div>
      {title && (
        <h2 className="picture-title">
          {title}
        </h2>
      )}
      {caption && (
        <p className="picture-caption">
          {caption}
        </p>
      )}
      {children}
    </div>
  );
};

Picture.propTypes = propTypes;

Picture.defaultProps = defaultProps;

export default Picture;
