import React from 'react';

import { useFactsQuery } from './facts-context';
import { selectCollectionByProvider } from './facts-utils';
import { SpeciesFields, SizeClassFields }from './field-mappings/biovolumes-fields';
import GeometricShapes from './field-mappings/biovolumes-shapes';
import getKey from 'Utilities/getKey';
import Placeholder from 'Components/Placeholder';

import './Biovolumes.scss';


const Biovolumes = () => {
  const { query } = useFactsQuery();

  const { isFetching, isError, currentData, error } = query;

  const biovolumes = (
    selectCollectionByProvider(
      currentData, 'biovolumes', 'helcom-peg'
    )
  );

  const speciesInfo = biovolumes?.attributes;
  const sizeClasses = biovolumes?.attributes.sizeClasses;

  const GeometricShape = GeometricShapes[
    speciesInfo?.geometricShape
  ];

  const isFigureField = f => (
    f === 'geometricShape' && GeometricShape
  );

  return (
    isFetching ? (
      <div className="facts-biovolumes is-loading">
        <h2><Placeholder /></h2>
        <div className="biovolumes-table species-table">
          <table>
            <tbody>
              {[...SpeciesFields.keys()].map(fieldKey => (
                <tr key={getKey('species', 'row', fieldKey)}>
                  <th><Placeholder /></th>
                  <td><Placeholder /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) :
    isError ? (
      <div className="facts-biovolumes is-missing">
        <h2>Biovolumes</h2>
        {error?.status === 404 && (
          <p>No data available for this taxon.</p>
        )}
      </div>
    ) : (
      <div className="facts-biovolumes">
        <h2>Biovolumes</h2>
        <div className="biovolumes-table species-table">
          <table>
            <tbody>
              {[...SpeciesFields.keys()].filter(
                fieldKey => speciesInfo[fieldKey] != null
              ).map(fieldKey => (
                isFigureField(fieldKey) ? (
                  <tr key="figure-row" className="figure-row">
                    <th scope="row">
                      {SpeciesFields.get(fieldKey)}
                    </th>
                    <td>
                      <GeometricShape />
                      <span className="figure-text">
                        {speciesInfo[fieldKey]}
                      </span>
                    </td>
                  </tr>
                ) : (
                  <tr key={getKey('species', 'row', fieldKey)}>
                    <th scope="row">
                      {SpeciesFields.get(fieldKey)}
                    </th>
                    <td>
                      {speciesInfo[fieldKey]}
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        <div className="biovolumes-table size-class-table">
          <div className="scroll-container">
            <table>
              <caption>
                {((sizeClassNumbers) => (
                  sizeClassNumbers.length > 1 ? (
                    `Showing size classes
                    ${Math.min(...sizeClassNumbers)}
                    -
                    ${Math.max(...sizeClassNumbers)}.`
                  ) : (
                    `Showing size class ${sizeClassNumbers[0]}.`
                  )
                ))(sizeClasses.map(
                  ({ sizeClassNo }) => parseInt(sizeClassNo, 10)
                ))}
              </caption>
              <tbody>
                {[...SizeClassFields.keys()].filter(
                  fieldKey => sizeClasses.some(
                    sizeClass => sizeClass[fieldKey] != null
                  )
                ).map(fieldKey => (
                  <tr key={getKey('size', 'class', 'row', fieldKey)}>
                    <th scope="row">
                      <span>
                        {SizeClassFields.get(fieldKey)}
                      </span>
                    </th>
                    {sizeClasses.map(sizeClass => (
                      <td key={getKey(
                        'size', 'class', sizeClass.sizeClassNo, 'field', fieldKey
                      )}>
                        {sizeClass[fieldKey]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};


export default Biovolumes;
