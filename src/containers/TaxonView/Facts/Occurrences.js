import React, { useMemo, useEffect, useState } from 'react';

import { useFactsQuery } from './facts-context';
import { selectCollectionByProvider } from './facts-utils';
import OccurrenceMap from 'Components/OccurrenceMap';
import { gbif } from 'Components/OccurrenceMap/presets';
import { ChevronDownIcon, ChevronUpIcon } from 'Components/Icons';

import './Occurrences.scss';


const Occurrences = () => {
  const { query } = useFactsQuery();
  const { currentData } = query;
  const externalLink = (selectCollectionByProvider(currentData, 'external links', 'gbif'));
  const [ gbifLink ] = externalLink?.attributes ?? [];
  const numberOfOccurrences = parseInt(gbifLink?.note, 10) || 0;

  const externalIds = useMemo(() => {
    const mainId = gbifLink?.externalId?.trim();
    const synonymIds = (gbifLink?.synonymExternalIds ?? '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    return [mainId, ...synonymIds].filter(Boolean);
  }, [gbifLink?.externalId, gbifLink?.synonymExternalIds]);

  const hasLayers = externalIds?.length > 0;
  const hasSynonymLayers = externalIds?.length > 1;

  const taxonNames = useMemo(() => {
    const scientificName = gbifLink?.scientificName?.trim();
    const synonymNames = (gbifLink?.synonymNames ?? '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    return [scientificName, ...synonymNames].filter(Boolean);
  }, [gbifLink?.scientificName, gbifLink?.synonymNames]);

  const externalIdToName = useMemo(() => (
    new Map(
      externalIds.map((id, i) => [id, taxonNames[i]])
    )
  ), [externalIds, taxonNames]);

  const [selectedSynonyms, setSelectedSynonyms] = useState(() => new Set());
  const [ isExpanded, setIsExpanded ] = useState(false);

  useEffect(() => {
    if (gbifLink?.externalId) {
      setSelectedSynonyms(new Set(externalIds));
    } else {
      // No external id for this taxon: clear any previous selection
      setSelectedSynonyms(new Set());
    }
  }, [gbifLink?.externalId, externalIds]);

  const handleToggle = (id) => {
    setSelectedSynonyms(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected = selectedSynonyms.size === externalIds.length;

  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedSynonyms(new Set());
    } else {
      setSelectedSynonyms(new Set(externalIds));
    }
  };

  return (
    <div className="facts-occurrences">
      <h2>Occurrences</h2>
      <OccurrenceMap
        {...gbif}
        externalIds={[...selectedSynonyms]}
        getOccurrenceTileUrl={
          externalId => gbif.getOccurrenceTileUrl(
            externalId, {
              style: numberOfOccurrences >= 30_000
                ? 'orangeHeat.point'
                : 'scaled.circles',
            }
          )
        }
      />

      {(hasLayers > 0 && isExpanded) && (
      <div className="checkbox-list">
        {(hasSynonymLayers) && <button
          type="button"
          onClick={handleToggleAll}
          className="select-layers-toggle"
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>}
        {(externalIds ?? []).map((id) => (
          <label key={id} className='checkbox-label'>
            <input
              type="checkbox"
              checked={selectedSynonyms.has(id)}
              onChange={() => handleToggle(id)}
            />
            {externalIdToName.get(id) ?? id}
          </label>
        ))}
      </div>

      )}
      {(hasLayers) && (
        <button
          type="button"
          className="show-layers-toggle"
          onClick={ev => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUpIcon />
              <span>Hide layers control</span>
            </>
          ) : (
            <>
              <span>Show layers control</span>
              <ChevronDownIcon />
            </>
          )}
        </button>
      )}
    </div>
  );
};


export default Occurrences;
