import React from 'react';
import { useParams } from 'react-router-dom';

import Article from 'Components/Article';
import NotFound from 'Components/Error/NotFound';
import Placeholder from 'Components/Placeholder';
import { useGetArticleByIdQuery } from 'Slices/articles';


const Page = ({ slug, children }) => {
  const params = useParams();

  const article = useGetArticleByIdQuery(
    slug ?? params.slug
  );

  const { title, content, layout } = (
    article.currentData ?? {}
  );

  const layoutName = `${layout ?? 'page'}-layout`;

  return (
    <div className={`page ${layoutName}`}>
      {article.isLoading ? (
        <Article title={<Placeholder />}>
          <p>
            <Placeholder repeat={5} />
          </p>
          {children}
        </Article>
      ) :
      article.isError ?  (
        <NotFound />
      ) : (
        <Article title={title} body={content}>
          {children}
        </Article>
      )}
    </div>
  );
};


export default Page;
