import React from 'react';

import { useFactsQuery } from './facts-context';
import { selectByCollection } from './facts-utils';
import getKey from 'Utilities/getKey';
import { ExternalLinkIcon } from 'Components/Icons';
import Placeholder from 'Components/Placeholder';

import './ExternalLinks.scss';


const ExternalLinks = () => {
  const { query } = useFactsQuery();

  const { isFetching, currentData } = query;

  const externalLinksData = (
    selectByCollection(currentData, 'external links')
  );

  const isMissing = (
    isFetching === false && externalLinksData == null
  );

  const externalLinks = (
    externalLinksData ?? []
  ).reduce(
    (links, {provider, attributes}) => [
      ...links, 
      ...attributes.map(
        ({externalId, externalUrl}) => ({
          provider, externalId, externalUrl,
        })
      )],
    []
  );

  return (
    isFetching ? (
      <div className="facts-external-links is-loading">
        <h2><Placeholder /></h2>
        <ul className="external-link-list">
          {(new Array(4).fill(null).map((_n, index) => (
            <li
              className="external-link-item"
              key={getKey(
                'external-link-placeholder', index
              )}
            >
              <Placeholder />
            </li>
          )))}
        </ul>
      </div>
    ) :
    isMissing ? (
      <div className="facts-external-links is-missing">
        <h2>External Links</h2>
        <p>No data available for this taxon.</p>
      </div>
    ) : (
      <div className="facts-external-links">
        <h2>External Links</h2>
        <ul className="external-link-list">
          {externalLinks.map(
            ({provider, externalId, externalUrl}) => (
              <li
                className="external-link-item"
                key={getKey(
                  'external-link', provider, externalId
                )}
              >
                <a href={externalUrl}>
                  <ExternalLinkIcon />
                  {provider}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    )
  );
};


export default ExternalLinks;
