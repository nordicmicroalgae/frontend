import React from 'react';
import { useParams } from 'react-router-dom';

import Article from '../../components/Article';
import NotFound from '../../components/Error/NotFound';
import { useGetArticleByIdQuery } from '../../slices/articles';


const Page = ({ slug, children }) => {
  const params = useParams();

  const article = useGetArticleByIdQuery(
    slug ?? params.slug
  );

  if (article.isError) {
    return <NotFound />;
  }

  const page = {
    id: article.data && article.data.id,
    title: article.data && article.data.title,
    body: article.data && article.data.content,
    children,
  };

  return <Article { ...page } />;
};


export default Page;
