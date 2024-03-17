export const gbif = {
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
