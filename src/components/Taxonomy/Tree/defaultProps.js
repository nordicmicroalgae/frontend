export default {
  path: [],
  ranks: [
    'Domain',
    'Kingdom',
    'Phylum',
    'Class',
    'Order',
    'Family',
    'Genus',
    'Species',
  ],
  level: 1,
  onCollapse(_taxon) {},
  onExpand(_taxon) {},
  onSelect(_taxon) {},
  Link: 'a',
  getLinkProps: _taxon => ({
    href: '#',
    onClick: ev => ev.preventDefault(),
  }),
};
