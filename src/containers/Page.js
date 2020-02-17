import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Article from '../components/Article';
import NotFound from '../components/Error/NotFound';
import { connect } from 'react-redux';
import { loadPage } from '../actions';


const propTypes = {
  slug: PropTypes.string.isRequired,
  page: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
};

const Page = ({ getPage, page, slug }) => {
  useEffect(() => {
    getPage(slug);
  }, [ slug ]);


  if (page === null) {
    return <p>Loading...</p>;
  }

  if (page === false) {
    return <NotFound />;
  }

  return <Article { ...page } />;
};

Page.propTypes = propTypes;


const mapStateToProps = (state, { match: { params } }) => {
  const { slug = 'introduction' } = params;
  const page = state.pages[slug];
  return { page, slug };
};

const mapDispatchToProps = dispatch => ({
  getPage: (slug) => dispatch(loadPage(slug))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
