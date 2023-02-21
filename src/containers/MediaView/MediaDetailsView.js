import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from './media-context';
import { getAttributeList } from './field-utils';
import Attributes from 'Components/Attributes';
import Picture from 'Components/Picture';
import { ChevronDownIcon, ChevronUpIcon } from 'Components/Icons';

import './MediaDetailsView.scss';


const propTypes = {
  expandable: PropTypes.bool,
};

const defaultProps = {
  expandable: true,
};


const MediaDetailsView = ({ expandable }) => {
  let { mediaset, selectedMedia } = useMediaQuery();

  if (selectedMedia == null && mediaset.length > 0 ) {
    selectedMedia = mediaset[0];
  }

  const [ isExpanded, setIsExpanded ] = useState(false);

  return (selectedMedia && (
    <div className="media-details-view">
      <Picture
        src={selectedMedia.renditions.l.url}
        width={1024}
      />
      <div className={
        expandable ? (
          `media-details ${isExpanded ? 'expanded' : 'collapsed'}`
        ) : (
          'media-details'
        )
      }>
        <p className="media-details-artist">
          Photographer/artist
          {' '}
          {selectedMedia.attributes.photographerArtist}
        </p>
        <p className="media-details-caption">
          {selectedMedia.attributes.caption}
        </p>
        <div className="media-details-additional-info">
          {(!expandable || isExpanded) && (
            <Attributes
              list={getAttributeList(selectedMedia.attributes)}
            />
          )}
          {expandable && (
            <button
              type="button"
              className="media-details-toggle"
              onClick={ev => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUpIcon />
                  <span>Hide additional image info</span>
                </>
              ) : (
                <>
                  <span>Show additional image info</span>
                  <ChevronDownIcon />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  ));
};

MediaDetailsView.propTypes = propTypes;

MediaDetailsView.defaultProps = defaultProps;


export default MediaDetailsView;
