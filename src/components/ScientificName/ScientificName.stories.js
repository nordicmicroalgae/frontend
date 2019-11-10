import React from 'react';
import ScientificName from './';
import Authority from '../Authority';

export default { title: 'Scientific Name' };

export const basic = () => (
  <ScientificName>Dinophysis acuta</ScientificName>
);

export const inHeading = () => (
  <h1>
    <ScientificName>Dinophysis acuta</ScientificName>
  </h1>
);

export const inHeadingWithAuthor = () => (
  <h1>
    <ScientificName>
      Dinophysis arctica
    </ScientificName>
    {' '}
    <Authority>
      Mereschkowsky
    </Authority>
  </h1>
);
