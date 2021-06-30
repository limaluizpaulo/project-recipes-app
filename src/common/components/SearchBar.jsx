import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <div>
        <input type="text" data-testid="search-input" placeholder="Buscar Receitas" />
      </div>

        <label htmlFor=“ingredient-input”>
          <input
            data-testid=“ingredient-search-radio”
            type=“radio”
            name=“search-radio”
            id=“ingredient-input”
            value=“ingredient”
          />
          Ingrediente
        </label>
        <label htmlFor=“name-search-input”>
          <input
            data-testid=“name-search-radio”
            type=“radio”
            name=“search-radio”
            id=“name-search-input”
            value=“name”
          />
          Nome
        </label>
        <label htmlFor=“first-letter-input”>
          <input
            data-testid=“first-letter-search-radio”
            type=“radio”
            name=“search-radio”
            id=“first-letter-input”
            value=“firstLetter”
          />
          Primeira letra
        </label>


      <div>
        <button type="button" data-testid="exec-search-btn">Buscar</button>
      </div>
    </div>
  );
}
