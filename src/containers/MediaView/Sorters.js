const Sorters = {
  title: (a, b) =>
    String(a.attributes.title ?? '').localeCompare(
      String(b.attributes.title ?? '')
    ),
};

export default Sorters;
