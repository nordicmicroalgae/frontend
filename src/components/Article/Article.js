import React from 'react';
import Markdown from 'react-markdown';

import formatDate from './helpers/format-date';
import trimWords from './helpers/hast-trim-words';


const RehypeTrimWords = options =>
  tree => trimWords(tree, options);


const defaultProps = {
  Heading: 'h1',
};

const Article = ({
  title,
  body,
  excerpt,
  postedBy,
  postedOn,
  children,
  Heading
}) => (
  <article className="article">
    <header className="article-header">
      <Heading>
        {title}
      </Heading>
      {postedOn && (
        <span className="article-posted-on">
          Posted on {' '}
          {formatDate(postedOn)}
        </span>
      )}
      {' '}
      {postedBy && (
        <span className="article-posted-by">
          by {' '}
          {postedBy}
        </span>
      )}
    </header>
    <div className="article-content">
      {body && (
        <Markdown>
          {body}
        </Markdown>
      )}
      {excerpt && (
        <Markdown
          allowedElements={[]}
          unwrapDisallowed={true}
          rehypePlugins={[RehypeTrimWords]}
        >
          {excerpt}
        </Markdown>
      )}
      {children}
    </div>
  </article>
);

Article.defaultProps = defaultProps;

export default Article;
