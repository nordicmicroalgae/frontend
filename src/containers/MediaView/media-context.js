import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetMediaQuery } from 'Slices/media';
import parseQueryString from 'Utilities/parseQueryString';


const MediaQueryContext = createContext();

function MediaQueryProvider({ children, queryArgs }) {
  const query = useGetMediaQuery(queryArgs);

  const location = useLocation();

  const params = parseQueryString(location.search);

  const mediaset = query.currentData || [];

  const requestedMedia = params.media;

  const selectedMedia = mediaset.find(
    ({ slug }) => slug === requestedMedia
  );

  const value = { query, mediaset, selectedMedia };

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
}

function useMediaQuery() {
  const context = useContext(MediaQueryContext);

  if (context === undefined) {
    throw new Error(
      'useMediaQuery must be used within a MediaQueryProvider.'
    );
  }

  return context;
}


export { MediaQueryProvider, useMediaQuery };
