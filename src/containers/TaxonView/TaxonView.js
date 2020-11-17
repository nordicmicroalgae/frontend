import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Authority from '../../components/Authority';
import ScientificName from '../../components/ScientificName';
import { loadTaxon } from '../../actions';


const propTypes = {
  aphiaId: PropTypes.string.isRequired,
  taxon: PropTypes.shape({
    authority: PropTypes.string,
    scientificName: PropTypes.string.isRequired
  })
};


const TaxonView = ({ aphiaId, taxon, getTaxon }) => {

  useEffect(() => {
    getTaxon(aphiaId);
  }, [ aphiaId ]);

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
    aphiaId: match.params.aphiaId,
    taxon: state.taxa[match.params.aphiaId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTaxon: (aphiaId) => dispatch(loadTaxon(aphiaId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxonView);
