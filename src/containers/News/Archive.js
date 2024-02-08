import React, { useEffect } from 'react';

import News from './News';


const Archive = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="news-archive">
      <h1>News archive</h1>
      <News />
    </section>
  );
};

export default Archive;
