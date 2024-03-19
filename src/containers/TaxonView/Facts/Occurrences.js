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

  const [ gbifLink ] =
    externalLink?.attributes ?? [];

  const numberOfOccurrences =
    parseInt(gbifLink?.note, 10) || 0;

  return (
    <div className="facts-occurrences">
      <h2>Occurrences</h2>
      <OccurrenceMap
        {...gbif}
        externalId={gbifLink?.externalId}
        getOccurrenceTileUrl={
          externalId => gbif.getOccurrenceTileUrl(
            externalId, {
              style: numberOfOccurrences >= 30_000
                ? 'orangeHeat.point'
                : 'scaled.circles'
            }
          )
        }
      />
    </div>
  );
};


export default Occurrences;
