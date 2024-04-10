import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useMediaQuery } from './media-context';
import { applyFilters, getAttributeList } from './field-utils';
import { filters } from './FieldFilters';
import Attributes from 'Components/Attributes';
import Picture from 'Components/Media/Picture';
import ScientificName from 'Components/ScientificName';
import { ChevronDownIcon, ChevronUpIcon } from 'Components/Icons';

import './MediaDetailsView.scss';


const propTypes = {
  expandable: PropTypes.bool,
};

const defaultProps = {
  expandable: true,
};


const MediaDetailsView = ({ expandable }) => {
  const location = useLocation();

  let { mediaset, selectedMedia } = useMediaQuery();

  if (selectedMedia == null && mediaset.length > 0 ) {
    selectedMedia = mediaset[0];
  }

  const [ isExpanded, setIsExpanded ] = useState(false);

  const relatedTaxon = selectedMedia?.relatedTaxon;

  const relatedTaxonPath = relatedTaxon
    ? `/taxon/${relatedTaxon.slug}/`
    : undefined;

  return (selectedMedia && (
    <div className="media-details-view">
      <Picture
        src={selectedMedia.renditions.l.url}
        backgroundColor="transparent"
        backgroundImage={selectedMedia.renditions.p.url}
        width={'100%'}
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
        {(relatedTaxon &&
          relatedTaxonPath != location.pathname) && (
          <p className="media-related-taxon">
            <Link
              to={{
                pathname: relatedTaxonPath,
                search: `media=${selectedMedia.slug}`,
              }}
            >
              More about 
              {' '}
              <ScientificName>
                {relatedTaxon.scientificName}
              </ScientificName>
            </Link>
          </p>
        )}
        <div className="media-details-additional-info">
          {(!expandable || isExpanded) && (
            <Attributes
              list={
                applyFilters(
                  getAttributeList(selectedMedia.attributes),
                  filters
                )
              }
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
