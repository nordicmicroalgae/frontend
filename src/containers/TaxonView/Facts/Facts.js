import React from 'react';
import PropTypes from 'prop-types';

import { FactsQueryProvider } from './facts-context';
import Biovolumes from './Biovolumes';
import ExternalLinks from './ExternalLinks';


const propTypes = {
  taxon: PropTypes.string.isRequired,
};

const Facts = ({ taxon, children }) => {
  return (
    <FactsQueryProvider taxon={taxon}>
      {children}
    </FactsQueryProvider>
  );
};

Facts.propTypes = propTypes;

Facts.Biovolumes = Biovolumes;
Facts.ExternalLinks = ExternalLinks;


export default Facts;
