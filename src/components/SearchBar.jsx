import React, { useContext } from 'react';
import RecipeContext from '../context';


export default function SearchBar() {
  const { setCheckedRadio, setInputValue, setRedirectSearchBar } = useContext(RecipeContext);

  function handleClick() {
    setRedirectSearchBar(true);
  }

  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="search">
        <input
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          onChange={ (e) => setInputValue(e.target.value) }
        />
        Ingredientes
      </label>
      <label htmlFor="search">
        <input
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="Nome"
          onChange={ (e) => setCheckedRadio(e.target.value) }
        />
        Nome
      </label>
      <label htmlFor="search">
        <input
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="Primeira letra"
          onChange={ (e) => setCheckedRadio(e.target.value) }
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ (() => handleClick) }
      >
        Pesquisar
      </button>
    </div>
  );
}
