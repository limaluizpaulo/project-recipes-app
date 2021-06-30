import React from 'react';

function SearchBar() {
  return (
    <form>
      <input
        type="text"
        name="ingrendients"
        data-testid="search-input"
      />
      <label htmlFor="ingrendients">
        <input
          type="radio"
          id="ingredients"
          name="ingrendients"
          data-testid="ingredients-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="nome">
        <input
          type="radio"
          name="ingrendients"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="primeiraLetra">
        <input
          type="radio"
          id="primeiraLetra"
          value="primeiraLetra"
          name="ingrendients"
          data-testid="first-letter-search-radio"
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
