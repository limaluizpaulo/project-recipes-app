import React, { useState } from 'react';

function SearchBar() {
  const [, setSearchText] = useState('');
  const [, setRadioButton] = useState('ingredients');

  return (
    <form>
      <input
        type="text"
        name="searchText"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <label htmlFor="ingrendients">
        <input
          type="radio"
          id="ingredients"
          value="ingredients"
          name="searchType"
          data-testid="ingredients-search-radio"
          onChange={ ({ target: { value } }) => setRadioButton(value) }
        />
        Ingrediente
      </label>
      <label htmlFor="nome">
        <input
          type="radio"
          id="nome"
          value="nome"
          name="searchType"
          data-testid="name-search-radio"
          onChange={ ({ target: { value } }) => setRadioButton(value) }
        />
        Nome
      </label>
      <label htmlFor="primeiraLetra">
        <input
          type="radio"
          id="primeiraLetra"
          value="primeiraLetra"
          name="searchType"
          data-testid="first-letter-search-radio"
          onChange={ ({ target: { value } }) => setRadioButton(value) }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}
export default SearchBar;
