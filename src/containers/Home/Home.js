import React from 'react';

import Introduction from './Introduction';
import LatestImages from './LatestImages';
import LatestNews from './LatestNews';
import Statistics from './Statistics';


const Home = () => (
  <div className="home">
    <div className="hero">
      <Introduction />
      <LatestImages />
    </div>
    <Statistics />
    <LatestNews />
  </div>
);

export default Home;
