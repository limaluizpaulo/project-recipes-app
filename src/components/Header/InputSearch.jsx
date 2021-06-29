import React from 'react';

function InputSearch() {
  return (

    <div>
      <input id="search" type="text" data-testid="search-input" />
      <input id="search" type="radio" data-testid="ingredient-search-radio" />
      <input id="search" type="radio" data-testid="name-search-radio" />
      <input id="search" type="radio" data-testid="first-letter-search-radio" />
      <button type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
}

export default InputSearch;
