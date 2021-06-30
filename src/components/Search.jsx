import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <div className="optionsSearch">
          <label htmlFor="search">
            <input type="text" name="search" value="search" data-testid="search-input" />
          </label>
          <div>
            <label htmlFor="ingredients">
              <input
                type="radio"
                name="filter"
                id="ingredients"
                value="ingredients"
                data-testid="ingredient-search-radio"
              />
              Ingredientes
            </label>

            <label htmlFor="name">
              <input
                type="radio"
                name="filter"
                id="name"
                value="name"
                data-testid="name-search-radio"
              />
              Nome
            </label>

            <label htmlFor="firstLetter">
              <input
                type="radio"
                name="filter"
                id="firstLetter"
                value="firstLetter"
                data-testid="first-letter-search-radio"
              />
              Primeira letra
            </label>
          </div>
        </div>
        <button type="button" data-testid="exec-search-btn">Buscar</button>
      </div>
    );
  }
}

export default Search;
