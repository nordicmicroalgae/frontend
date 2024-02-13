import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'Components/Spinner';

const propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  title: PropTypes.string,
  caption: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  Placeholder: PropTypes.func,
};

const defaultProps = {
  width: 640,
  backgroundColor: '#f0f0f0',
  Placeholder: Spinner,
};

const Status = {
  Pending: Symbol('pending'),
  Loading: Symbol('loading'),
  Failure: Symbol('failure'),
  Success: Symbol('success'),
};

const Picture = ({
  src,
  width,
  title,
  caption,
  backgroundColor,
  backgroundImage,
  children,
  onLoad,
  onError,
  Placeholder,
}) => {
  const [status, setStatus] = useState(Status.Pending);

  useEffect(() => {
    setStatus(Status.Loading);

    const loadHandler = e => {
      setStatus(Status.Success);
      onLoad && onLoad(e);
    };

    const errorHandler = e => {
      setStatus(Status.Failure);
      onError && onError(e);
    };

    const image = new Image();
    image.src = src;

    image.addEventListener('load', loadHandler);
    image.addEventListener('error', errorHandler);

    return () => {
      image.removeEventListener('load', loadHandler);
      image.removeEventListener('error', errorHandler);
    }
  }, [src]);

  return (
    <div
      className="picture-container"
      style={{width: `${width}px`}}
    >
      <div
        className="picture"
        style={{
          backgroundColor,
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined
        }}
      >
        <div className="picture-source">
          {
            status == Status.Loading ? (
              <Placeholder />
            ) :
            status == Status.Failure ? (
              <p>Image not available</p>
            ) :
            status == Status.Success ? (
              <img src={src} />
            ) : (
              null
            )
          }
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
