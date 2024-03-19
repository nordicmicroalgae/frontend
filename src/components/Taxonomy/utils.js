import RANKS from './ranks';

const lowerCaseRanks = RANKS.map(
  rank => rank.toLowerCase()
);

export function compareRanks(a, b) {
  return (
    lowerCaseRanks.indexOf(
      a.toLowerCase()
    )
    -
    lowerCaseRanks.indexOf(
      b.toLowerCase()
    )
  );
}
