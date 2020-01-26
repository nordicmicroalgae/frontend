import React, { useEffect, useState } from 'react';
import Page from '../components/Page';


function readPage(page = 'introduction') {
  return fetch(`/api/page/${page}/`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }
      return response.json();
    })
}

const PageContainer = ({ match }) => {
  let [ page, setPage ] = useState(undefined);
  let [ isFetching, setIsFetching ] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    readPage(match.params.page)
      .then(({ page }) => {
        setPage(page);
      })
      .catch(_error => {
        setPage(undefined);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [ match.params.page ])

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (page == null) {
    return <h1>Page not found</h1>
  }

  return <Page { ...page } />;
};

export default PageContainer;
