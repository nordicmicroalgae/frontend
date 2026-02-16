import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import getKey from 'Utilities/getKey';
import { useGetArtistsQuery } from 'Slices/media';


const HallOfFame = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const query = useGetArtistsQuery();

  // Filter out contributors with null/undefined artist names
  const validArtists = (query.data || []).filter(
    ({artist}) => artist != null && artist !== ''
  );

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
        {validArtists.map(({artist, numberOfContributions}) => (
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
