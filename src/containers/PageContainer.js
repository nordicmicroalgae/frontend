import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';
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

  if (page.failedToFetch) {
    return <h1>Could not fetch page</h1>;
  }

  return <Page { ...page } />;
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
