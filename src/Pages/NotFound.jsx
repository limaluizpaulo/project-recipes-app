import React from 'react';
import notFound from '../images/notFound.png';

function NotFound() {
  return (
    <div className="tela-found">
      <div className="img-notFound">
        <img src={ notFound } alt="" />
        <h1>Not Found</h1>
      </div>
    </div>
  );
}

export default NotFound;
