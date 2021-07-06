import React, { useState } from 'react';

function SBElements() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [FirstLetter, setFirstLetter] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchInput, setsearchInput] = useState('');

  const getIngredients = () => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setIngredients(results.meals)));
    console.log(`Requisição 1, ${ingredients}`);
  };

  const getRecipes = () => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setRecipes(results.meals)));
    console.log(`Requisição 1, ${recipes}`);
  };

  const getFirstLetter = () => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setFirstLetter(results.meals)));
    console.log(`Requisição 1, ${FirstLetter}`);
  };

  const handleClick = () => {
    switch (filter) {
    case 'ingredientes':
      getIngredients();
      break;
    case 'recipe':
      getRecipes();
      break;
    case 'firstLetter':
      // const searchInput = document.getElementById('searchInput').innerText;
      if (searchInput.length !== 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      getFirstLetter();

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
        onChange={ (event) => setsearchInput(event.target.value) }
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
