import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppReceitasContext from '../context/AppReceitasContext';

function SearchInput() {
  const { pathname } = useLocation();
  const { setParametrosBusca } = useContext(AppReceitasContext);
  const [selectFilter, setSelectFilter] = useState({
    flag: '',
    input: '',
  });
  const exibirAlert = (funcaoAlert) => {
    funcaoAlert('Sua busca deve conter somente 1 (um) caracter');
  };

  const handleChange = ({ target }) => {
    setSelectFilter({
      ...selectFilter, [target.name]: target.value,
    });
  };

  const executeSearch = () => {
    const apelidoAPI = pathname.replace('/', '');
    const { flag, input } = selectFilter;
    if (flag === 'f' && input.length > 1) {
      return exibirAlert(alert);
    }
    setParametrosBusca({ ...selectFilter, apelidoAPI });
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
          name="flag"
          onChange={ handleChange }
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          name="flag"
          onChange={ handleChange }
          value="s"
          id="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          name="flag"
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
        onClick={ executeSearch }
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchInput;
