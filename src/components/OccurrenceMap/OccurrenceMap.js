import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import OLMap from 'ol/Map';
import TileImage from 'ol/source/TileImage';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { createXYZ } from 'ol/tilegrid';
import { fromLonLat } from 'ol/proj';
import { getCenter } from 'ol/extent';


const propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  externalIds: PropTypes.arrayOf(PropTypes.string),
  getAttributions: PropTypes.func,
  getViewExtent: PropTypes.func,
  getViewOptions: PropTypes.func,
  getTileOptions: PropTypes.func,
  getBaseTileUrl: PropTypes.func.isRequired,
  getOccurrenceTileUrl: PropTypes.func.isRequired,
};


const OccurrenceMap = ({
  externalIds = [],
  width = '100%',
  height = '50vh',
  getAttributions = () => [],
  getViewExtent,
  getViewOptions = () => ({
    center: fromLonLat([8, 60]),
    zoom: 4,
  }),
  getTileOptions = () => ({
    projection: 'EPSG:3857',
    tileGrid: createXYZ({
      minZoom: 0,
      maxZoom: 15,
      tileSize: 512,
    }),
    tilePixelRatio: 1,
    wrapX: true,
  }),
  getBaseTileUrl,
  getOccurrenceTileUrl,
}) => {
  const elRef = useRef();
  const olRef = useRef();
  const layersRef = useRef(new globalThis.Map());

  useEffect(() => {
    const viewExtent = getViewExtent
      ? getViewExtent()
      : undefined;

    const map = new OLMap({
      target: elRef.current,
      layers: [
        new TileLayer({
          source: new TileImage({
            ...getTileOptions(),
            attributions: getAttributions(),
            url: getBaseTileUrl(),
          })
        }),
      ],
      view: new View({
        ...getViewOptions(),
        ...(viewExtent ? {
          center: getCenter(viewExtent),
          extent: viewExtent,
        } : {})
      }),
    });

    olRef.current = map;

    return () => {
      const cached = layersRef.current;
      if (map && cached) {
        cached.forEach(layer => {
          map.removeLayer(layer);
        });
        cached.clear();
      }
    };
  }, []);

  useEffect(() => {
    const map = olRef.current;
    if (!map) return;

    const nextIds = new Set(externalIds || []);
    const cachedLayers = layersRef.current;

    cachedLayers.forEach((layer, id) => {
      if (!nextIds.has(id)) {
        layer.setVisible(false);
      }
    });

    nextIds.forEach(id => {
      const existing = cachedLayers.get(id);
      if (existing) {
        existing.setVisible(true);
      } else {
        const layer = new TileLayer({
          source: new TileImage({
            ...getTileOptions(),
            url: getOccurrenceTileUrl(id),
          }),
          visible: true,
        });
        map.addLayer(layer);
        cachedLayers.set(id, layer);
      }
    });
  }, [externalIds]);

  return (
    <div
      ref={elRef}
      className="occurrence-map"
      style={{width, height}}
    />
  );
};

OccurrenceMap.propTypes = propTypes;

export default OccurrenceMap;
