import React, { useState } from 'react';

function SearchBar() {
  const [selectedRadio, setSelectedRadio] = useState();

  handleChange = ({ target }) => {

  };

  return (
    <section>
      <form>
        <input
          data-testid="search-input"
          type="text"
          onChange={ () => handleChange(e) }
        />
        <label htmlFor="radio-search">
          Ingrediente
          <input
            type="radio"
            name="radio-search"
            data-testid="ingredient-search-radio"
            onClick={ () => handleChange(e) }
          />
          Nome
          <input
            type="radio"
            name="radio-search"
            data-testid="name-search-radio"
            onClick={ () => handleChange(e) }
          />
          Primeira letra
          <input
            type="radio"
            name="radio-search"
            data-testid="first-letter-search-radio"
            onClick={ () => handleChange(e) }
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
