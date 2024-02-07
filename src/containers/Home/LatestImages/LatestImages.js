import React from 'react';

import MediaView from 'Containers/MediaView';


const LatestImages = () => (
  <section className="latest-illustrations">
    <h2>Latest added illustrations</h2>
    <MediaView query={{limit: 4}}>
      <MediaView.Thumbnails />
      <MediaView.DetailsDialog />
    </MediaView>
  </section>
);

export default LatestImages;
