import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Buscar Receita" data-testid="search-input" />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          name="filter"
          value="ingredient"
        />
      </label>

      <label htmlFor="name">
        Nome
        <input
          type="radio"
          id="name"
          data-testid="name-search-radio"
          name="filter"
          value="name"
        />
      </label>

      <label htmlFor="firstLetter">
        Primeira Letra
        <input
          type="radio"
          id="firstLetter"
          data-testid="first-letter-search-radio"
          name="filter"
          value="firstLetter"
        />
      </label>

      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}
