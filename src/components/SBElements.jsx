import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';

function SBElements({ history }) {
  const { searchInput, setsearchInput,
    recipes, setRecipes, drinks, setDrinks } = useContext(ContextRecipes);
  const { location: { pathname } } = history;

  const getIngredients = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.name}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setRecipes(results.meals)));
    }
    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput.name}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setDrinks(results.drinks)));
    }
  };

  const getRecipes = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.name}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setRecipes(results.meals)));
    }
    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput.name}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setDrinks(results.drinks)));
    }
  };

  const getFirstLetter = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput.name}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setRecipes(results.meals)));
    }
    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput.name}`;
      fetch(endpoint)
        .then((response) => response.json()
          .then((results) => setDrinks(results.drinks)));
    }
  };

  const handleClick = () => {
    switch (searchInput.searchBy) {
    case 'Ingredientes':
      getIngredients();
      break;
    case 'Receita':
      getRecipes();
      break;
    case 'Primeira letra':
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

  const handleFilter = () => {
    if (searchInput.name && pathname === '/comidas') {
      const recipeFiltered = recipes
        .filter((recipe) => recipe.strMeal.includes(searchInput.name));
      setRecipes(recipeFiltered);
    }
    if (searchInput.name && pathname === '/bebidas') {
      const drinksFiltered = drinks
        .filter((recipe) => recipe.strDrink.includes(searchInput.name));
      setDrinks(drinksFiltered);
    }
  };

  const setFunctions = ({ target: { name, value } }) => {
    setsearchInput({ ...searchInput, [name]: value });
  };

  return (
    <div>
      <input
        id="searchInput"
        name="name"
        type="text"
        data-testid="search-input"
        onChange={ setFunctions }
      />
      <label
        htmlFor="ingredientes"
      >
        {'Ingredientes '}
        <input
          id="ingredientes"
          name="searchBy"
          value="Ingredientes"
          type="radio"
          data-testid="ingredient-search-radio"
          onChange={ setFunctions }
        />
      </label>
      <label
        htmlFor="recipe"
      >
        {'Receita '}
        <input
          id="recipe"
          name="searchBy"
          value="Receita"
          type="radio"
          data-testid="name-search-radio"
          onChange={ setFunctions }
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
        value="Primeira letra"
        type="radio"
        data-testid="first-letter-search-radio"
        onChange={ setFunctions }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => { handleClick(); handleFilter(); } }
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
