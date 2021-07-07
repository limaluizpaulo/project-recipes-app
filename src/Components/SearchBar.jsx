import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <fieldset>
        <label htmlFor="Primeira letra">
          Primeira letra
          <input
            type="radio"
            data-testid="search-input"
            name="filterOptions"
            id="Primeira letra"
          />
        </label>
        <label htmlFor="Nome">
          Nome
          <input type="radio" data-testid="search-input" name="filterOptions" id="Nome" />
        </label>
        <label htmlFor="Ingrediente">
          Ingrediente
          <input
            type="radio"
            data-testid="search-input"
            name="filterOptions"
            id="Ingrediente"
          />
        </label>
      </fieldset>
    );
  }
}

export default SearchBar;
