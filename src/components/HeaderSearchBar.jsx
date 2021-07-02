import React, { useContext } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

function HeaderSearchBar() {
  const { requestParams: { chosenFilter, searchText },
    handleChange, FoodsEndPoint,
    DrinksEndPoint } = useContext(Context);
  return (
    <form>
      <fieldset>
        <label htmlFor="search">
          <input
            value={ searchText }
            onChange={ handleChange }
            name="searchText"
            id="search"
            type="search"
            data-testid="search-input"
          />
        </label>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            value="Ingrediente"
            onChange={ handleChange }
            name="chosenFilter"
            required
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            value="Nome"
            onChange={ handleChange }
            name="chosenFilter"
            required
            id="name"
            type="radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            value="Primeira letra"
            onChange={ handleChange }
            name="chosenFilter"
            id="first-letter"
            required
            type="radio"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          onClick={ () => fetchAPI(FoodsEndPoint, chosenFilter, searchText) }
          type="button"
          data-testid="exec-search-btn"
        >
          Pesquisar
        </button>
      </fieldset>
    </form>
  );
}

export default HeaderSearchBar;
