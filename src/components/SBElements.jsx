import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';

function SBElements({ history }) {
  const [ingredients, setIngredients] = useState([]);
  const [FirstLetter, setFirstLetter] = useState([]);
  const [filter, setFilter] = useState('');
  const { searchInput, setsearchInput,
    recipes, setRecipes, drinks } = useContext(ContextRecipes);

  const { location: { pathname } } = history;

  const getIngredients = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setIngredients(results.meals)));
      console.log(`Requisição 1 comidas, ${ingredients}`);
    }
    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setIngredients(results.drinks)));
      console.log(`Requisição 1 bebidas, ${ingredients}`);
    }
  };

  const getRecipes = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setRecipes(results.meals)));
      console.log(`Requisição 2 comidas, ${recipes}`);
    }
    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setIngredients(results.drinks)));
      console.log(`Requisição 2 bebidas, ${ingredients}`);
    }
  };

  const getFirstLetter = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setFirstLetter(results.meals)));
      console.log(`Requisição 1, ${FirstLetter}`);
    }
    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setIngredients(results.drinks)));
      console.log(`Requisição 2 bebidas, ${ingredients}`);
    }
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
    case searchInput:
      if (pathname === '/comidas') {
        const recipesFiltered = recipes
          .filter((recipe) => recipe.strMeal.includes(searchInput));
        return recipesFiltered;
      }
      if (pathname === '/bebidas') {
        const drinksFiltered = drinks
          .filter((recipe) => recipe.strDrink.includes(searchInput));
        return drinksFiltered;
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
        // value={searchInput.name}
        onChange={ (event) => setsearchInput({
          name: event.target.value,
        }) }
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

SBElements.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default SBElements;
