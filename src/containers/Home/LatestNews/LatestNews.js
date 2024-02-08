import React from 'react';
import { Link } from 'react-router-dom';

import News from 'Containers/News';
import { Newspaper } from './Graphic';


const LatestNews = () => (
  <section className="latest-news">
    <h2>
      Latest news
      <Newspaper />
    </h2>
    <News query={{limit: 3}} />
    <p>
      <Link to={'/news/'}>
        News archive &rarr;
      </Link>
    </p>
  </section>
);

export default LatestNews;
