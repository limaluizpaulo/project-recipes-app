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
            testid="ingredient-search-radio"
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
            testid="first-letter-search-radio"
          />
        </label>
        <section>
          <button
            data-testid="exec-search-btn"
            onClick={ () => console.log('click') }
            
          >

          </button>
        </section>
      </form>
    </section>
  );
}

export default SearchBar;
