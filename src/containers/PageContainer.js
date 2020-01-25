import React, { useEffect, useState } from 'react';
import Page from '../components/Page';


function readPage(page) {
  const pages = [
    'latest-images',
    'hall-of-fame',
    'how-to-contribute',
    'partners',
    'nomp',
    'helcom-peg',
    'links',
    'literature'
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pages.includes(page)) {
        return resolve({
          title: page,
          body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
        });
      }
      return reject();
    }, 1000);
  });
}

const PageContainer = ({ match }) => {
  let [ page, setPage ] = useState(undefined);
  let [ isFetching, setIsFetching ] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    readPage(match.params.page)
      .then(page => {
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
