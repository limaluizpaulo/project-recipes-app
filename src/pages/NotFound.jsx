import React from 'react';

function NotFound() {
  return (
    <section>
      <h2 style={ { textAlign: 'center' } }>Not Found</h2>
      {/* { imagem retirada no site: https://geekblog.com.br/error-404-veja-o-que-e-e-como-resolver/} */}
      <img src="https://geekblog.com.br/wp-content/uploads/2021/02/Erro-404-1-1-1024x645-1-700x441.jpg" alt="Página não encontrada" width="100%" />
    </section>
  );
}

export default NotFound;
