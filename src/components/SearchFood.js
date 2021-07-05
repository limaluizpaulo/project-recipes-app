import React, { useState } from 'react';
import fetchRecipe from '../services/recipeAPI';

function SearchFood() {
  const [choice, setChoice] = useState('');
  const [text, setText] = useState('');

  function clickAPI() {
    console.log(choice, text);
    if (choice === 'ingredient') {
      fetchRecipe(`i=${text}`);
    }
    if (choice === 'name') {
      fetchRecipe(`s={${text}}`);
    }
    if (choice === 'letter') {
      if (text.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        console.log('passou');
        fetchRecipe(`f=${text}`);
      }
    }
  }
  return (
    <div>
      <input
        onChange={ ({ target }) => setText(target.value) }
        data-testid="search-input"
        type="text"
      />
      <label htmlFor="ingredient">
        <input
          onClick={ ({ target }) => setChoice(target.value) }
          name="choice"
          type="radio"
          value="ingredient"
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          onClick={ ({ target }) => setChoice(target.value) }
          name="choice"
          type="radio"
          value="name"
          id="name"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="letter">
        <input
          onClick={ ({ target }) => setChoice(target.value) }
          name="choice"
          type="radio"
          value="letter"
          id="letter"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button
        onClick={ clickAPI }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar

      </button>
    </div>
  );
}

export default SearchFood;
