import React from 'react';

function HeaderSearchBarWithButton() {
  return (
    <form>
      <fieldset>
        <label htmlFor="search">
          <input
            id="search"
            type="search"
            data-testid="search-input"
          />
        </label>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            name="radio-input"
            required
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            name="radio-input"
            required
            id="name"
            type="radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            name="radio-input"
            id="first-letter"
            required
            type="radio"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Pesquisar
        </button>
      </fieldset>
    </form>
  );
}

export default HeaderSearchBarWithButton;
