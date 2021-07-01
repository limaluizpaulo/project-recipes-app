/* eslint-disable no-alert */
import React, { useState, useContext } from 'react';

import RecipesContext from '../context/RecipesContext';

import './style/SearchForm.css';

function SearchForm() {
  const { searchRecipesBy } = useContext(RecipesContext);
  const [searchPayload, setSearchPayload] = useState('');
  const [searchParameter, setSearchParameter] = useState('');

  const handleSearchClick = () => {
    if (searchParameter === 'firstLetter') {
      const validPayload = searchPayload.length === 1;
      return validPayload ? searchRecipesBy(
        { searchParameter, searchPayload },
      ) : alert('Sua busca deve conter somente 1 (um) caracter');
    }
    searchRecipesBy({ searchParameter, searchPayload });
  };

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchPayload(target.value) }
      />
      <section className="search-content">
        <section className="search-parameters">
          <label htmlFor="ingredient">
            Ingrediente
            <input
              type="radio"
              name="search-parameter"
              id="ingredient"
              data-testid="ingredient-search-radio"
              className="radio"
              onChange={ ({ target }) => setSearchParameter(target.id) }
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              type="radio"
              name="search-parameter"
              id="name"
              data-testid="name-search-radio"
              className="radio"
              onChange={ ({ target }) => setSearchParameter(target.id) }
            />
          </label>
          <label htmlFor="firstLetter">
            Primeira letra
            <input
              type="radio"
              name="search-parameter"
              id="firstLetter"
              data-testid="first-letter-search-radio"
              className="radio"
              onChange={ ({ target }) => setSearchParameter(target.id) }
            />
          </label>
        </section>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearchClick }
        >
          Buscar
        </button>
      </section>
    </form>
  );
}

export default SearchForm;
