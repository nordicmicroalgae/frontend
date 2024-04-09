import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetMediaQuery } from 'Slices/media';
import parseQueryString from 'Utilities/parseQueryString';
import Sorters from './Sorters';


const MediaQueryContext = createContext();

function MediaQueryProvider({ children, queryArgs }) {
  const query = useGetMediaQuery(queryArgs);

  const location = useLocation();

  const params = parseQueryString(location.search);

  // Allow for any implemented client-side based sorter to take place,
  // but only on entire sets (not server-side sliced subsets).
  const isNotSliced =
    [queryArgs.limit, queryArgs.offset].every(
      qa => qa == null
    );
  const sortFn = isNotSliced && Sorters[params.sort];

  const mediaset = query.currentData
    ? sortFn
      ? query.currentData.toSorted(sortFn)
      : query.currentData
    : [];

  const requestedMedia = params.media;

  const selectedMedia = mediaset.find(
    ({ slug }) => slug === requestedMedia
  );

  const value = { query, mediaset, selectedMedia, params, };

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
