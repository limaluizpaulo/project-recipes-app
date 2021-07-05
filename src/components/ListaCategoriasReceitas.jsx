import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UseListaCategorias from '../hooks/UseListaCategorias';
import AppReceitasContext from '../context/AppReceitasContext';

function ListaCategoriasReceitas() {
  const rotaAtual = useLocation().pathname;
  const apelidoAPI = rotaAtual.replace('/', '');
  const categorias = UseListaCategorias(apelidoAPI);
  const { setParametrosBusca } = useContext(AppReceitasContext);
  const [toggle, settoggle] = useState(false);

  useEffect(() => {
  }, [toggle]);

  const handleClick = ({ target: innerHTML }) => {
    settoggle(!toggle);
    if (toggle) {
      setParametrosBusca({ flag: 'c', apelidoAPI, input: innerHTML });
    } else {
  
    }
  };

  return (
    <>
      {categorias.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {strCategory}
        </button>
      ))}
    </>
  );
}

export default ListaCategoriasReceitas;
