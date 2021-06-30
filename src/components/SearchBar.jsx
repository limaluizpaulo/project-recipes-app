import React, { Component } from 'react';

import '../css/SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <div className="search">
        <div className="search-container">
          <input data-testid="search-input" type="text" placeholder="Buscar Receita" />

          <form action="">
            <label htmlFor="radio-ingredient">
              <input
                type="radio"
                id="radio-ingredient"
                value="ingredient"
                name="search-filter"
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>

            <label htmlFor="radio-name">
              <input
                type="radio"
                id="radio-name"
                value="name"
                name="search-filter"
                data-testid="name-search-radio"
              />
              Nome
            </label>

            <label htmlFor="radio-first-letter">
              <input
                type="radio"
                value="first-letter"
                name="search-filter"
                id="radio-first-letter"
                data-testid="first-letter-search-radio"
              />
              Primeira Letra
            </label>
          </form>

          <button
            data-testid="exec-search-btn"
            className="btt-search"
            type="button"
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
