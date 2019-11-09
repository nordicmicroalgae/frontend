import React from 'react';
import ScientificName from './components/ScientificName';

export default { title: 'Scientific Name' };

export const withName = () => (
  <ScientificName>Dinophysis acuta</ScientificName>
);
