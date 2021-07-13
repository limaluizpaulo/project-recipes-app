import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Desculpe, a página não foi encontrada</p>
      <Link to="/explorar/bebidas">
        <button type="button">Voltar</button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
