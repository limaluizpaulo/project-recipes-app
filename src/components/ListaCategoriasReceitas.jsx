import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UseListaCategorias from '../hooks/UseListaCategorias';
import AppReceitasContext from '../context/AppReceitasContext';

function ListaCategoriasReceitas() {
  const rotaAtual = useLocation().pathname;
  const apelidoAPI = rotaAtual.replace('/', '');
  const categorias = UseListaCategorias(apelidoAPI);
  const { setParametrosBusca } = useContext(AppReceitasContext);
  const [toggle, settoggle] = useState(true);

  const handleClick = (strCategory) => {
    if (toggle) {
      setParametrosBusca({ flag: 'c', apelidoAPI, input: strCategory });
      settoggle(!toggle);
    } else {
      setParametrosBusca({ apelidoAPI, flag: 's', input: '' });
      settoggle(!toggle);
    }
  };

  return (
    <>
      {categorias.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => { handleClick(strCategory); } }
        >
          {strCategory}
        </button>
      ))}
    </>
  );
}

export default ListaCategoriasReceitas;
