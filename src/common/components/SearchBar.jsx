import React, { useState } from 'react';

export default function SearchBar() {
  const [searchbar, setSearchBar] = useState('');

  return (

    <div>
      <div>
        <input
          type="text"
          value={ searchbar }
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setSearchBar(value) }
          placeholder="Buscar Receitas"
        />
      </div>
      <label htmlFor="r1">
        <input
          type="radio"
          on
          data-testid="ingredient-search-radio"
          id="r1"
          name="rate"
          value="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="r2">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="r2"
          name="rate"
          value="name"
        />
        Nome
      </label>
      <label htmlFor="r3">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="r3"
          name="rate"
          value="fistLetter"
        />
        primeira letra
      </label>
      <div>
        <button type="button" data-testid="exec-search-btn">Buscar</button>
      </div>
    </div>

  );
}
