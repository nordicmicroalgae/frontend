import { useEffect, useState } from 'react';

import extendedRanks from 'Components/Taxonomy/ranks';

const defaultRanks = [
  'Domain',
  'Kingdom',
  'Phylum',
  'Class',
  'Order',
  'Family',
  'Genus',
  'Species',
  'Subspecies',
  'Variety',
  'Form',
  'Forma',
];

export default function useVaryingRanks(currentRank) {
  const [
    hasOnceUsedExtendedRanks,
    setHasOnceUsedExtendedRanks
  ] = useState(false);

  const currentRankIsConsideredExtended =
    currentRank && !defaultRanks.includes(currentRank);

  useEffect(() =>
    setHasOnceUsedExtendedRanks(prevState =>
      prevState || currentRankIsConsideredExtended
    ),
    [currentRankIsConsideredExtended]
  );

  const shouldUseExtendedRanks = [
    hasOnceUsedExtendedRanks,
    currentRankIsConsideredExtended
  ].some(
    wasOrIsConsideredExtended => wasOrIsConsideredExtended
  );

  return shouldUseExtendedRanks ? extendedRanks : defaultRanks;
}
