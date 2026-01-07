import React from 'react';
import { Link } from 'react-router-dom';

import { useGetStatisticsQuery } from 'Slices/statistics';
import Placeholder from 'Components/Placeholder';
import getKey from 'Utilities/getKey';
import * as Graphic from './Graphic';


const Fields = new Map([
  ['species', 'Species'],
  ['taxa', 'Taxa'],
  ['images', 'Images'],
  ['imageLabelingImages', 'Image Labeling'],
  ['contributors', 'Contributors'],
]);

const Links = new Map([
  ['species', '/quick-view/'],
  ['taxa', '/taxon/'],
  ['images', '/gallery/'],
  ['imageLabelingImages', '/image-labeling/'],
  ['contributors', '/hall-of-fame/'],
]);

const Statistics = () => {
  const { isFetching, currentData } = (
    useGetStatisticsQuery()
  );

  return (
    isFetching ? (
      <section className="statistics is-loading">
        <h2><Placeholder /></h2>
        <dl>
        {[...Fields.keys()].map(key => (
          <React.Fragment key={getKey('statistics', key)}>
            <dt><Placeholder /></dt>
            <dd><Placeholder /></dd>
          </React.Fragment>
        ))}
        </dl>
      </section>
    ) : (
      <section className="statistics">
        <h2>Statistics</h2>
        <dl>
        {[...Fields.entries()].map(([key, label]) => (
          <Link
            to={Links.get(key)}
            key={getKey('statistics', key)}>
            <dt>
              {Graphic[label.replace(' ', '')] && Graphic[label.replace(' ', '')]()}
              {label}
            </dt>
            <dd>{currentData[key].toLocaleString()}</dd>
          </Link>
        ))}
        </dl>
      </section>
    )
  );
};

export default Statistics;
