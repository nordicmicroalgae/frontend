import TAXONOMY_RANKS from '../../ranks';

const defaultOptions = {
  ranks: TAXONOMY_RANKS,
  identifier: 'slug',
};

export default function compileList(data, parent = null, options = {}) {

  const { ranks, identifier } = {
    ...defaultOptions,
    ...options
  };

  let list = [];

  if (parent == null) {
    for (const rank of ranks) {
      const entriesForRank = Object.entries(data).filter(
        ([ _key, taxon ]) => taxon.rank === rank
      );
      if (entriesForRank.length > 0) {
        list = entriesForRank.map(([ key, _taxon ]) => key);
        break;
      }
    }
  } else {
    const recurseChildrenIfNotInRanks = taxonKey => {
      data[taxonKey].children.forEach(childTaxon => {
        if (!ranks.includes(childTaxon.rank)) {
          return recurseChildrenIfNotInRanks(childTaxon[identifier]);
        }
        list.push(childTaxon[identifier]);
      });
    };
    recurseChildrenIfNotInRanks(parent);
  }

  return list;
}