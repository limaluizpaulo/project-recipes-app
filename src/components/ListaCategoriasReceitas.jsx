import React from 'react';
import { useLocation } from 'react-router-dom';
import UseListaCategorias from '../hooks/UseListaCategorias';

function ListaCategoriasReceitas() {
  const rotaAtual = useLocation().pathname;
  const apelidoAPI = rotaAtual.replace('/', '');
  const categorias = UseListaCategorias(apelidoAPI);

  return (
    <>
      {categorias.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))}
    </>
  );
}

export default ListaCategoriasReceitas;
