import React from 'react';
import { useParams } from 'react-router-dom';

import Article from '../../components/Article';
import NotFound from '../../components/Error/NotFound';
import Placeholder from '../../components/Placeholder';
import { useGetArticleByIdQuery } from '../../slices/articles';


const Page = ({ slug, children }) => {
  const params = useParams();

  const article = useGetArticleByIdQuery(
    slug ?? params.slug
  );

  if (article.isError) {
    return <NotFound />;
  }

  if (article.isLoading) {
    return (
      <Article title={<Placeholder />}>
        <p>
          <Placeholder repeat={5} />
        </p>
        {children}
      </Article>
    );
  }

  const { title, content } = article.data;

  return (
    <Article title={title} body={content}>
      {children}
    </Article>
  );
};


export default Page;
