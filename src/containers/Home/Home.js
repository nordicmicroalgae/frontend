import React from 'react';

import Introduction from './Introduction';
import LatestImages from './LatestImages';


const Home = () => (
  <div className="home">
    <div className="hero">
      <Introduction />
      <LatestImages />
    </div>
  </div>
);

export default Home;
