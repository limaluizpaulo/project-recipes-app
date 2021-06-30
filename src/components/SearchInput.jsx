import React from 'react';

function SearchInput() {
  return (
    <form
      data-testid="search-input"
    >
      <label htmlFor="search-input">
        <input type="text" name="" id="search-input" data-testid="search-input" />
      </label>
      <label htmlFor="ingredient-search-radio">
        Ingrediente
        <input
          type="radio"
          value="ingrediente"
          name="search"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          type="radio"
          name="search"
          value="nome"
          id="name-search-radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        Primeira letra
        <input
          name="search"
          type="radio"
          value="letra"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </form>
  );
}

export default SearchInput;
