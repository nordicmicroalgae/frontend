import React from 'react';
import { Link } from 'react-router-dom';

import { useMediaQuery } from './media-context';
import Picture from '../../components/Picture';
import getKey from '../../utils/getKey';

import './MediaSetView.scss';


const MediaSetView = () => {
  const { mediaset } = useMediaQuery();

  return (
    <div className="mediaset-view">
      {mediaset.map(({ slug, renditions }) => (
        <Link
          to={`?media=${slug}`}
          replace={true}
          className="media-thumbnail"
          key={getKey('media', slug)}
        >
          <Picture src={renditions.s.url} width={160} />
        </Link>
      ))}
    </div>
  )
};


export default MediaSetView;
