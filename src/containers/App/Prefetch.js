import React from 'react';

import { usePrefetchTaxa } from 'Slices/taxa';
import { usePrefetchSynonyms } from 'Slices/synonyms';


const Prefetch = ({children}) => {
  const prefetchTaxa = usePrefetchTaxa();
  const prefetchSynonyms = usePrefetchSynonyms();

  prefetchTaxa();
  console.log('prefetching taxa');

  prefetchSynonyms();
  console.log('prefetching synonyms');

  return children;
};

export default Prefetch;
