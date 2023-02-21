import React from 'react';

import Page from './Page';
import MediaView from 'Containers/MediaView';


const Home = () => (
  <div className="home">
    <Page slug={'introduction'}>
      <div className="latest-illustrations">
        <h2>Latest added illustrations</h2>
        <MediaView query={{limit: 4}}>
          <MediaView.Thumbnails />
          <MediaView.DetailsDialog />
        </MediaView>
      </div>
    </Page>
  </div>
);

export default Home;
