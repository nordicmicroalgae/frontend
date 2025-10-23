import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';


const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

const Dialog = ({ id, title, onClose = (ev) => {}, children }) => {

  const ref = useRef();

  useEffect(() => {
    document.body.classList.add('has-overlay');

    if (ref.current) {
      ref.current.focus();
    }

    return () => {
      document.body.classList.remove('has-overlay');

      if (ref.current) {
        ref.current.blur();
      }
    }
  }, []);

  const handleClickOverlay = ev => {
    ev.stopPropagation();
    if (ev.currentTarget === ev.target) {
      onClose(ev);
    }
  };

  const handleKeyUp = ev => {
    ev.stopPropagation();
    if (ev.keyCode === 27) {
      onClose(ev);
    }
  };

  return createPortal((
    <div className="dialog-overlay" onClick={handleClickOverlay}>
      <div
        id={id}
        className="dialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby={title && `${id}-title`}
        aria-modal="true"
        onKeyUp={handleKeyUp}
        ref={ref}
      >
        <div className="dialog-header">
          {title && (
            <h2 id={`${id}-title`} className="dialog-title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="dialog-close"
            arial-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">
              &times;
            </span>
          </button>
        </div>
        <div className="dialog-content">
          {children}
        </div>
      </div>
    </div>
  ), document.body);
};

Dialog.propTypes = propTypes;

export default Dialog;
