import React from 'react';

import './style/SearchBar.css';

function SearchBar() {
  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
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
            />
          </label>
        </section>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </section>
    </form>
  );
}

export default SearchBar;
