import React, { useState } from 'react';

/* function foo() {
  const alert = myCustomLib.customAlert;
  alert();
} */

function SBElements() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [FirstLetter, setFirstLetter] = useState([]);
  const [filter, setFilter] = useState('');

  const getIngredients = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setIngredients(results.meals)));
    console.log('feito requisição 1');
  };

  const getRecipes = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s={nome}';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setRecipes(results.meals)));
    console.log('feito requisição 2');
  };

  const getFirstLetter = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setFirstLetter(results.meals)));
    console.log('feito requisição 3');
  };

  const handleClick = () => {
    const searchInput = document.getElementById('searchInput').innerText;
    switch (filter) {
    case 'ingredientes':
      getIngredients();
      break;
    case 'recipe':
      getRecipes();
      break;
    case 'firstLetter':
      if (searchInput.length !== 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        getFirstLetter();
      }
      break;
    default:
      console.log('nada aconteceu');
      break;
    }
  };

  return (
    <div>
      <input
        id="searchInput"
        type="text"
        data-testid="search-input"
      />
      <label
        htmlFor="ingredientes"
      >
        {'Ingredientes '}
        <input
          id="ingredientes"
          name="searchBy"
          type="radio"
          data-testid="ingredient-search-radio"
          onChange={ (e) => setFilter(e.target.id) }
        />
      </label>
      <label
        htmlFor="recipe"
      >
        {'Receita '}
        <input
          id="recipe"
          name="searchBy"
          type="radio"
          data-testid="name-search-radio"
          onChange={ (e) => setFilter(e.target.id) }
        />
      </label>
      <label
        htmlFor="firstLetter"
      >
        {'Primeira letra '}
      </label>
      <input
        id="firstLetter"
        name="searchBy"
        type="radio"
        data-testid="first-letter-search-radio"
        onChange={ (e) => setFilter(e.target.id) }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SBElements;
