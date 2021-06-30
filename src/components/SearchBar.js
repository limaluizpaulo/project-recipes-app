import React, { useState } from 'react';

const SearchBar = () => {
  const [option, setOption] = useState('');
  console.log(option);
  return (
    <div>
      <label htmlFor="search">
        Explorar:
        <input id="search" type="text" data-testid="search-input" />
      </label>
      <div onChange={ ({ target: { value } }) => setOption(value) }>
        <label htmlFor="radioIngredient">
          Ingredient
          <input
            id="radioIngredient"
            value="ingredient"
            name="radiobutton"
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="radioName">
          Nome
          <input
            id="radioName"
            value="name"
            name="radiobutton"
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="radioFirstLetter">
          Primeira letra
          <input
            id="radioFirstLetter"
            value="firstLetter"
            name="radiobutton"
            type="radio"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
