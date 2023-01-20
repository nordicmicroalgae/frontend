import React from 'react';
import Article from '../components/Article';
import NotFound from '../components/Error/NotFound';
import { useGetArticleByIdQuery } from '../slices/articles';



const Page = ({ match }) => {
  const article = useGetArticleByIdQuery(match.params.slug);


  if (article.isError) {
    return <NotFound />;
  }

  const page = {
    id: article.data && article.data.id,
    title: article.data && article.data.title,
    body: article.data && article.data.content,
  };

  return <Article { ...page } />;
};


export default Page;
