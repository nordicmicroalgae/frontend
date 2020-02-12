import React from 'react';


const Article = ({ title, body }) => (
  <article className="article">
    <header className="article-header">
      <h1>
        {title}
      </h1>
    </header>
    <div className="article-content">
      {body}
    </div>
  </article>
);

export default Article;
