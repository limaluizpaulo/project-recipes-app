import React from 'react';

function SBElements() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
      />
      <label
        htmlFor="ingredientes"
      >
        {'Ingredientes '}
      </label>
      <input
        name="ingredientes"
        type="radio"
        data-testid="ingredient-search-radio"
      />
      <label
        htmlFor="recipe-name-search"
      >
        {'Receita '}
      </label>
      <input
        name="recipe-name-search"
        type="radio"
        data-testid="name-search-radio"
      />
      <label
        htmlFor="first-letter-search"
      >
        {'Primeira letra '}
      </label>
      <input
        name="first-letter-search"
        type="radio"
        data-testid="first-letter-search-radio"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SBElements;
