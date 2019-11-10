import React from 'react';
import ScientificName from './';

export default { title: 'Scientific Name' };

export const basic = () => (
  <ScientificName>Dinophysis acuta</ScientificName>
);

export const inHeading = () => (
  <h1>
    <ScientificName>Dinophysis acuta</ScientificName>
  </h1>
);
