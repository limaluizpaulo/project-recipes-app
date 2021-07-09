import React from 'react';

import notFound from '../images/notfound.png';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      {/* { imagem retirada no site: https://geekblog.com.br/error-404-veja-o-que-e-e-como-resolver/} */}
      <img src={ notFound } alt="Página não encontrada" width="100%" />
      <a href="http://localhost:3000/comidas">
        <h2>Not Found</h2>
      </a>
    </section>
  );
}

export default NotFound;
