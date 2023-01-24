import PropTypes from 'prop-types';

import TAXONOMY_RANKS from './ranks';



const Identifier = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

const Rank = PropTypes.oneOf(TAXONOMY_RANKS);

const Taxon = PropTypes.shape({
  rank: Rank,
  scientificName: PropTypes.string.isRequired,
  children: PropTypes.array,
});

export default { Identifier, Rank, Taxon };
