import React from 'react';
import Markdown from 'react-markdown';


const Article = ({ title, body, children }) => (
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
      {children}
    </div>
  </article>
);

export default Article;
