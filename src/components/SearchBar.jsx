import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context';

export default function SearchBar() {
  const { pathname } = useLocation();
  const {
    setCheckedRadio,
    setInputValue,
    setRedirectSearchBar,
    setRouteFromSearch,
  } = useContext(RecipeContext);
  const [radioValue, setRadioValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  // source https://surajsharma.net/blog/current-url-in-react

  function handleClick() {
    setInputValue(searchInputValue);
    setCheckedRadio(radioValue);
    setRouteFromSearch(pathname);
    setRedirectSearchBar(true);
  }

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ (e) => setSearchInputValue(e.target.value) }
      />
      <label htmlFor="search">
        <input
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          value="Ingredientes"
          onChange={ (e) => setRadioValue(e.target.value) }
        />
        Ingredientes
      </label>
      <label htmlFor="search">
        <input
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="Nome"
          onChange={ (e) => setRadioValue(e.target.value) }
        />
        Nome
      </label>
      <label htmlFor="search">
        <input
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="Primeira letra"
          onChange={ (e) => setRadioValue(e.target.value) }
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ (() => handleClick()) }
      >
        Pesquisar
      </button>
    </div>
  );
}
