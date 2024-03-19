export const gbif = {
  getAttributions: () => [
    '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    '<a href="https://openmaptiles.org/">OpenMapTiles</a>',
    'occurrence data from <a href="https://www.gbif.org/">GBIF</a>.'
  ].join(', '),
  getBaseTileUrl:
    (params = {}) => [
      'https://tile.gbif.org/3857/omt/{z}/{x}/{y}@1x.png',
      new URLSearchParams({
        style: 'gbif-tuatara',
        ...params,
      })
    ].join('?'),
  getOccurrenceTileUrl:
    (externalId, params = {}) => [
      'https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png',
      new URLSearchParams({
        srs: 'EPSG:3857',
        style: 'scaled.circles',
        taxonKey: externalId,
        ...params,
      })
    ].join('?'),
};
