import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { comidaApi, bebidaApi } from '../services/servicesApi';
import AppReceitasContext from '../context/AppReceitasContext';

function SearchInput() {
  const pathName = useHistory();
  const { setfetchAPI } = useContext(AppReceitasContext);
  const [selectFilter, setSelectFilter] = useState({
    input: '',
    search: '',
  });

  const chamaAlert = (funcaoAlert) => {
    funcaoAlert('Sua busca deve conter somente 1 (um) caracter');
  };

  const verificaTamanhoArray = (array, type) => {
    if (array !== null) {
      const objeto = array[0];
      let id = '';

      if (type === 'comidas') {
        id = 'idMeal';
      } else {
        id = 'idDrink';
      }

      if (array.length === 1) {
        pathName.push(`/${type}/${objeto[id]}`);
      }
    }
  };

  const getApiComidas = async ({ input, search }) => {
    if ((input.length > 1) && (search === 'f')) {
      chamaAlert(alert);
    } else {
      const resposta = await comidaApi(input, search);
      setfetchAPI(resposta);
      verificaTamanhoArray(resposta.meals, 'comidas');
    }
  };

  const getApiBedidas = async ({ input, search }) => {
    if ((input.length > 1) && (search === 'f')) {
      chamaAlert(alert);
    } else {
      const resposta = await bebidaApi(input, search);
      setfetchAPI(resposta);
      verificaTamanhoArray(resposta.drinks, 'bebidas');
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
        onClick={ () => (pathName.location.pathname === '/comidas'
          ? getApiComidas(selectFilter) : getApiBedidas(selectFilter)) }
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchInput;
