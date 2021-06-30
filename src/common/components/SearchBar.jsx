import React from 'react';

export default function SearchBar() {
  return (

    <div>
      <div>
        <input type="text" data-testid="search-input" placeholder="Buscar Receitas" />
      </div>
      <label htmlFor="r1">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="r1"
          name="rate"
          value="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="r2">
        <input type="radio" id="r2" name="rate" value="name" />
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
