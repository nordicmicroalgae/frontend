import React from 'react';

import { useFactsQuery } from './facts-context';
import { selectCollectionByProvider } from './facts-utils';
import OccurrenceMap from 'Components/OccurrenceMap';
import { gbif } from 'Components/OccurrenceMap/presets';


const Occurrences = () => {
  const { query } = useFactsQuery();

  const { currentData } = query;

  const externalLink = (
    selectCollectionByProvider(
      currentData, 'external links', 'gbif'
    )
  );

  const [ gbifLink ] = externalLink?.attributes ?? [];

  return (
    <div className="facts-occurrences">
      <h2>Occurrences</h2>
      <OccurrenceMap
        {...gbif}
        externalId={gbifLink?.externalId}
      />
    </div>
  );
};


export default Occurrences;
