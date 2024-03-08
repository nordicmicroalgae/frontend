import TAXONOMY_RANKS from '../../ranks';

const defaultOptions = {
  ranks: TAXONOMY_RANKS,
  identifier: 'slug',
};

export default function reduceChildren(data, key, options = {}) {
  const { ranks, identifier } = {
    ...defaultOptions,
    ...options
  };
  return (data[key].children ?? []).reduce(
    (children, candidate) => [
      ...children,
      ...(
        ranks.includes(candidate.rank)
          ? [candidate[identifier]]
          : reduceChildren(data, candidate[identifier], options)
      ),
    ],
    []
  );
}
