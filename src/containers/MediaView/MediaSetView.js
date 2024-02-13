import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useMediaQuery } from './media-context';
import { getAttributeList, getFieldKeys } from './field-utils';
import Attributes from 'Components/Attributes';
import Frame from 'Components/Media/Frame';
import Picture from 'Components/Media/Picture';
import getKey from 'Utilities/getKey';

import './MediaSetView.scss';


const propTypes = {
  fieldList: PropTypes.arrayOf(
    PropTypes.oneOf(getFieldKeys()),
  ),
};

const defaultProps = {
  fieldList: [
    'title',
    'createdAt',
    'photographerArtist',
    'contributingOrganisation',
  ],
};


const MediaSetView = ({ fieldList }) => {
  const { mediaset } = useMediaQuery();

  return (
    <div className="mediaset-view">
      {mediaset.map(media => (
        <Link
          to={`?media=${media.slug}`}
          replace={true}
          className="media-thumbnail"
          key={getKey('media', media.slug)}
        >
          <Frame>
            <Picture
              src={media.renditions.s.url}
              backgroundColor="transparent"
              backgroundImage={media.renditions.p.url}
              width={160}
            >
              {Array.isArray(fieldList) && fieldList.length > 0 && (
                <Attributes
                  list={getAttributeList(
                    {...media, ...media.attributes},
                    fieldList
                  )}
                />
              )}
            </Picture>
          </Frame>
        </Link>
      ))}
    </div>
  )
};

MediaSetView.propTypes = propTypes;

MediaSetView.defaultProps = defaultProps;

export default MediaSetView;
