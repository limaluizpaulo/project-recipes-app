import React from 'react';

function SearchBar() {
  return (
    <section>
      <form>
        <input
          data-testid="search-input"
          type="text"
          onChange={ console.log('oi') }
        />
        <label htmlFor="radio-search">
          Ingrediente
          <input
            type="radio"
            name="radio-search"
            data-testid="ingredient-search-radio"
          />
          Nome
          <input
            type="radio"
            name="radio-search"
            data-testid="name-search-radio"
          />
          Primeira letra
          <input
            type="radio"
            name="radio-search"
            data-testid="first-letter-search-radio"
          />
        </label>
        <section>
          <button
          type="button"
            data-testid="exec-search-btn"
            onClick={ () => console.log('click') }
          >
            Buscar
          </button>
        </section>
      </form>
    </section>
  );
}

export default SearchBar;
