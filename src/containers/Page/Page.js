import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Article from 'Components/Article';
import NotFound from 'Components/Error/NotFound';
import Placeholder from 'Components/Placeholder';
import { useGetArticleByIdQuery } from 'Slices/articles';
import { useGetVersionQuery } from 'Slices/version';

/* global __APP_VERSION__ */

const replaceTemplatePlaceholders = (text, backendVersion) => {
  if (!text) return text;

  return text
    .replace('YYYY-MM-DD', new Date().toISOString().slice(0, 10))
    .replace('BACKEND_VERSION', backendVersion ?? '')
    .replace('FRONTEND_VERSION', __APP_VERSION__);
};


const Page = ({ slug, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const params = useParams();

  const article = useGetArticleByIdQuery(
    slug ?? params.slug
  );

  const backendVersion = useGetVersionQuery();

  const { title, content, author, date, layout } = (
    article.currentData ?? {}
  );

  const processedContent = replaceTemplatePlaceholders(
    content,
    backendVersion.currentData?.version
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
        <Article
          title={title}
          postedBy={author}
          postedOn={date}
          body={processedContent}
        >
          {children}
        </Article>
      )}
    </div>
  );
};


export default Page;
