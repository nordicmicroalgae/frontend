import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Map from 'ol/Map';
import TileImage from 'ol/source/TileImage';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { createXYZ } from 'ol/tilegrid';
import { fromLonLat } from 'ol/proj';
import { getCenter } from 'ol/extent';

import { Europe } from './boundaries';


const propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  getViewExtent: PropTypes.func,
  getViewOptions: PropTypes.func,
  getTileOptions: PropTypes.func,
  getBaseTileUrl: PropTypes.func.isRequired,
  getOccurrenceTileUrl: PropTypes.func.isRequired,
};

const defaultProps = {
  width: '100%',
  height: '50vh',
  getViewExtent: () =>
    Europe.reduce(
      (extent, [lat, lon]) => [
        ...extent,
        ...fromLonLat([lon, lat])
      ],
      []
    ),
  getViewOptions: () => ({
    zoom: 2,
  }),
  getTileOptions: () => ({
    projection: 'EPSG:3857',
    tileGrid: createXYZ({
      minZoom: 0,
      maxZoom: 15,
      tileSize: 512,
    }),
    tilePixelRatio: 1,
    wrapX: true,
  }),
};

const OccurrenceMap = ({
  externalId,
  width,
  height,
  getViewExtent,
  getViewOptions,
  getTileOptions,
  getBaseTileUrl,
  getOccurrenceTileUrl,
}) => {
  const elRef = useRef();
  const olRef = useRef();

  useEffect(() => {
    const viewExtent = getViewExtent();

    const map = new Map({
      target: elRef.current,
      layers: [
        new TileLayer({
          source: new TileImage({
            ...getTileOptions(),
            url: getBaseTileUrl(),
          })
        }),
      ],
      view: new View({
        ...getViewOptions(),
        center: getCenter(viewExtent),
        extent: viewExtent,
      }),
    });

    olRef.current = map;
  }, []);

  useEffect(() => {
    const map = olRef.current;

    let layer;

    if (map && externalId) {
      layer = new TileLayer({
        source: new TileImage({
          ...getTileOptions(),
          url: getOccurrenceTileUrl(externalId),
        }),
      });
      map.addLayer(layer);
    }

    return () => {
      if (map && layer) {
        map.removeLayer(layer);
      }
    }
  }, [externalId]);

  return (
    <div
      ref={elRef}
      className="occurrence-map"
      style={{width, height}}
    />
  );
};

OccurrenceMap.propTypes = propTypes;

OccurrenceMap.defaultProps = defaultProps;


export default OccurrenceMap;
