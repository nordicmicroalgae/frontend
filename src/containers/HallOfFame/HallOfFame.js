import React from 'react';
import { Link } from 'react-router-dom';

import getKey from 'Utilities/getKey';
import { useGetArtistsQuery } from 'Slices/media';


const HallOfFame = () => {
  const query = useGetArtistsQuery();

  return (
    <div className="hall-of-fame">
      <h1>Hall of fame</h1>
      <span className="medal">
        <span className="medal-ribbon-left" />
        <span className="medal-ribbon-right" />
        <span className="medal-base">
          <span className="medal-star" />
        </span>
      </span>
      <ol className="artist-list">
        {(query.data || []).map(({artist, numberOfContributions}) => (
          <li
            key={getKey('artist', artist)}
            className="artist-list-item"
          >
            <Link
              to={`/gallery/artist/${encodeURIComponent(artist)}/`}
              className="artist-link"
            >
              <span className="artist-name">
                {artist} ({numberOfContributions})
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};


export default HallOfFame;
