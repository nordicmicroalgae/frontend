import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Authority from '../../components/Authority';
import ScientificName from '../../components/ScientificName';
import { loadTaxon } from '../../actions';


const propTypes = {
  scientificName: PropTypes.string.isRequired,
  taxon: PropTypes.shape({
    authority: PropTypes.string,
    scientificName: PropTypes.string.isRequired
  })
};


const TaxonView = ({ scientificName, taxon, getTaxon }) => {

  useEffect(() => {
    getTaxon(scientificName);
  }, [ scientificName ]);

  if (taxon == null) {
    return <p>Loading...</p>;
  }

  return (
    <section className="taxon-view">
      <h1>
        <ScientificName>
          {taxon.scientificName}
        </ScientificName>
        {taxon.authority && (
          <>
            {' '}
            <Authority>
              {taxon.authority}
            </Authority>
          </>
        )}
      </h1>
    </section>
  );
};

TaxonView.propTypes = propTypes;

const mapStateToProps = (state, { match }) => {
  return {
    scientificName: match.params.scientificName,
    taxon: state.taxa[match.params.scientificName]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTaxon: (scientificName) => dispatch(loadTaxon(scientificName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxonView);
