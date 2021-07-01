import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { comidaApi, bebidaApi } from '../services/servicesApi';
import AppReceitasContext from '../context/AppReceitasContext';

function SearchInput() {
  const pathName = useLocation().pathname;
  const { setfetchAPI } = useContext(AppReceitasContext);
  const [selectFilter, setSelectFilter] = useState({
    input: '',
    search: '',
  });

  const chamaAlert = (funcaoAlert) => {
    funcaoAlert('Sua busca deve conter somente 1 (um) caracter');
  };

  const getApiComidas = async ({ input, search }) => {
    if ((input.length > 1) && (search === 'f')) {
      chamaAlert(alert);
    } else {
      const resposta = await comidaApi(input, search);
      setfetchAPI(resposta);
    }
  };

  const getApiBedidas = async ({ input, search }) => {
    if ((input.length > 1) && (search === 'f')) {
      chamaAlert(alert);
    } else {
      const resposta = await bebidaApi(input, search);
      setfetchAPI(resposta);
    }
  };

  const handleChange = ({ target }) => {
    setSelectFilter({
      ...selectFilter, [target.name]: target.value,
    });
  };

  return (
    <form>
      <label htmlFor="search-input">
        <input
          type="text"
          name="input"
          id="search-input"
          onChange={ handleChange }
          data-testid="search-input"
        />
      </label>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          value="i"
          name="search"
          onChange={ handleChange }
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          name="search"
          onChange={ handleChange }
          value="s"
          id="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          name="search"
          onChange={ handleChange }
          type="radio"
          value="f"
          id="first-letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => (pathName === '/comidas'
          ? getApiComidas(selectFilter) : getApiBedidas(selectFilter)) }
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchInput;
