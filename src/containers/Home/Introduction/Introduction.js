import React from 'react';

import Article from 'Components/Article';
import Placeholder from 'Components/Placeholder';
import { useGetArticleByIdQuery } from 'Slices/articles';


const Introduction = () => {
  const { isFetching, currentData } = (
    useGetArticleByIdQuery('introduction')
  );

  return (
    <section className="introduction">
      {isFetching ? (
        <Article title={<Placeholder />}>
          <p>
            <Placeholder repeat={5} />
          </p>
        </Article>
      ) : (
        <Article body={currentData.content} />
      )}
    </section>
  );
};

export default Introduction;
