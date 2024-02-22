import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useMediaQuery } from './media-context';
import { getAttributeList, getFieldKeys } from './field-utils';
import MediaGrid from 'Components/Media/Grid';

import './MediaSetView.scss';


const propTypes = {
  fieldList: PropTypes.arrayOf(
    PropTypes.oneOf(getFieldKeys()),
  ),
  itemSize: PropTypes.arrayOf(
    PropTypes.number
  ),
  itemSpacing: PropTypes.number,
  GridItemWrapper: PropTypes.node,
};

const defaultProps = {
  fieldList: [
    'title',
    'createdAt',
    'photographerArtist',
    'contributingOrganisation',
  ],
};


const MediaSetView = ({
  fieldList,
  itemSize,
  itemSpacing,
  GridItemWrapper,
}) => {
  const { mediaset } = useMediaQuery();

  return (
    <MediaGrid
      virtual={mediaset.length > 500}
      size={itemSize}
      spacing={itemSpacing}
      data={mediaset.map(
        media => ({
          key: media.slug,
          previewUrl: media.renditions.p.url,
          thumbnailUrl: media.renditions.s.url,
          attributes: getAttributeList(
            {...media, ...media.attributes},
            fieldList
          )
        })
      )}
      ItemWrapper={({data, children}) => (
        <Link
          to={`?media=${data.key}`}
          replace={true}
        >
          {GridItemWrapper ? (
            <GridItemWrapper>
              {children}
            </GridItemWrapper>
          ) : (
            children
          )}
        </Link>
      )}
    />
  )
};

MediaSetView.propTypes = propTypes;

MediaSetView.defaultProps = defaultProps;

export default MediaSetView;
