import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Article from '../components/Article';
import { connect } from 'react-redux';
import { loadPage } from '../actions';


const propTypes = {
  slug: PropTypes.string.isRequired,
  page: PropTypes.object
};

const PageContainer = ({ getPage, page, slug }) => {
  useEffect(() => {
    getPage(slug);
  }, [ slug ]);

  if (page == null) {
    return null;
  }

  if (page.isFetching) {
    return <p>Loading...</p>;
  }

  if (page.isNotFound) {
    return <h1>Page not found</h1>;
  }

  return <Article { ...page } />;
};

PageContainer.propTypes = propTypes;


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
)(PageContainer);
