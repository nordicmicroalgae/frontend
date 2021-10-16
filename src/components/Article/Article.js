import React from 'react';
import Markdown from 'react-markdown';


const Article = ({ title, body }) => (
  <article className="article">
    <header className="article-header">
      <h1>
        {title}
      </h1>
    </header>
    <div className="article-content">
      <Markdown>
        {body}
      </Markdown>
    </div>
  </article>
);

export default Article;
