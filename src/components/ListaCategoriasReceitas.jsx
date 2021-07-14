import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UseListaCategorias from '../hooks/UseListaCategorias';
import AppReceitasContext from '../context/AppReceitasContext';

function ListaCategoriasReceitas() {
  const rotaAtual = useLocation().pathname;
  const apelidoAPI = rotaAtual.replace('/', '');
  const categorias = UseListaCategorias(apelidoAPI);
  const { setParametrosBusca, parametrosBusca } = useContext(AppReceitasContext);

  const handleClick = (strCategory) => {
    if ((strCategory !== 'All') && (parametrosBusca.input !== strCategory)) {
      setParametrosBusca({ flag: 'c', apelidoAPI, input: strCategory });
    } else {
      setParametrosBusca({ apelidoAPI, flag: 's', input: '' });
    }
  };

  return (
    <>
      {categorias.map(({ strCategory }) => (
        <Button
          className="categButton"
          variant="outline-danger"
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => { handleClick(strCategory); } }
        >
          {strCategory}
        </Button>
      ))}
      <Button
        className="categButton"
        variant="outline-danger"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClick('All') }
      >
        All
      </Button>
    </>
  );
}

export default ListaCategoriasReceitas;
