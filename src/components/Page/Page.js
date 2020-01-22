import React from 'react';


const Page = ({ title, body }) => (
  <article className="page">
    <header className="page-header">
      <h1>
        {title}
      </h1>
    </header>
    <div className="page-content">
      {body}
    </div>
  </article>
);

export default Page;
