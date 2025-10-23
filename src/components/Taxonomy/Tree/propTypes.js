import PropTypes from 'prop-types';

import Types from '../types';


export default {
  data: PropTypes.objectOf(Types.Taxon).isRequired,
  parent: Types.Identifier,
  taxon: Types.Identifier,
  ranks: PropTypes.arrayOf(Types.Rank),
  path: PropTypes.arrayOf(Types.Identifier),
  selected: Types.Identifier,
  level: PropTypes.number,
  onCollapse: PropTypes.func,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  Link: PropTypes.elementType,
  getLinkProps: PropTypes.func,
};
