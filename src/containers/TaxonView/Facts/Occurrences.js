import React, { useMemo, useEffect, useState, lazy, Suspense } from 'react';

import { useFactsQuery } from './facts-context';
import { selectCollectionByProvider } from './facts-utils';
import { gbif } from 'Components/OccurrenceMap/presets';
import { ChevronDownIcon, ChevronUpIcon } from 'Components/Icons';

import './Occurrences.scss';

const OccurrenceMap = lazy(() => import('Components/OccurrenceMap'));


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
      <Suspense fallback={<div className="occurrence-map" style={{ width: '100%', height: '50vh' }} /> }>
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
      </Suspense>

      {(hasLayers > 0 && isExpanded) && (
      <div className="checkbox-list">
        {(hasSynonymLayers) && <button
          type="button"
          onClick={handleToggleAll}
          className="select-layers-toggle"
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>}
        {externalIds && externalIds.length > 0 && (
          <>
            <label key={externalIds[0]} className='checkbox-label'>
              <input
                type="checkbox"
                checked={selectedSynonyms.has(externalIds[0])}
                onChange={() => handleToggle(externalIds[0])}
              />
              {externalIdToName.get(externalIds[0]) ?? externalIds[0]}
            </label>
            {hasSynonymLayers && (
              <>
                <div>Synonyms:</div>
                {externalIds.slice(1).map(id => (
                  <label key={id} className='checkbox-label'>
                    <input
                      type="checkbox"
                      checked={selectedSynonyms.has(id)}
                      onChange={() => handleToggle(id)}
                    />
                    <a href={`https://www.gbif.org/species/${id}`} target="_blank" rel="noopener noreferrer">{externalIdToName.get(id) ?? id}</a>
                  </label>
                ))}
              </>
            )}
          </>
        )}
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
