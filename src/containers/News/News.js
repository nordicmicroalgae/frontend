import React from 'react';
import { Link } from 'react-router-dom';

import { useGetArticleByIdQuery, useGetArticlesQuery } from 'Slices/articles';
import Article from 'Components/Article';
import Placeholder from 'Components/Placeholder';
import getKey from 'Utilities/getKey';


const News = ({ query }) => {
  const { isFetching, currentData } = (
    useGetArticlesQuery({
      ...(query ?? {}),
      type: 'news',
    })
  );

  return (
    isFetching ? (
      <div className="news is-loading">
        {(new Array(query?.limit ?? 10).fill(0).map((_n, index) => (
          <Article
            title={<Placeholder />}
            key={getKey('placeholder', index)}
          >
            <p>
              <Placeholder repeat={5} />
            </p>
          </Article>
        )))}
      </div>
    ) : (
      <div className="news">
        {currentData.map(slug =>(
          <NewsArticle
            slug={slug}
            key={getKey('news', slug)}
          />
        ))}
      </div>
    )
  );
};


const NewsArticle = ({ slug }) => {
  const { isFetching, currentData } = (
    useGetArticleByIdQuery(slug)
  );

  return (
    isFetching ? (
      <Article title={<Placeholder />}>
        <p>
          <Placeholder repeat={5} />
        </p>
      </Article>
    ) : (
      <Article
        title={currentData.title}
        excerpt={currentData.content}
        postedBy={currentData.author}
        postedOn={currentData.date}
        Heading={() => (
          <h2>
            <Link to={`/${currentData.id}/`}>
              {currentData.title}
            </Link>
          </h2>
        )}
      />
    )
  );
};

export default News;
