import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';

function SBElements({ history }) {
  const {
    searchInput,
    setsearchInput,
    setRecipes,
    setDrinks,
    // recipes,
    // drinks,
  } = useContext(ContextRecipes);

  const alertMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const { location: { pathname } } = history;
  const fetchMeals = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => {
          if (!results.meals) {
            global.alert(alertMsg);
          } else {
            setRecipes(results.meals);
          }
        }));
  };

  const fetchDrinks = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => {
          if (!results.drinks) {
            global.alert(alertMsg);
          } else {
            setDrinks(results.drinks);
          }
        }));
  };
  const getIngredients = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.name}`;
      fetchMeals(endpoint);
    }
    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput.name}`;
      fetchDrinks(endpoint);
    }
  };

  const getRecipes = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.name}`;
      fetchMeals(endpoint);
    }
    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput.name}`;
      fetchDrinks(endpoint);
    }
  };

  const alertCaracterNumber = 'Sua busca deve conter somente 1 (um) caracter';
  const getFirstLetter = () => {
    if (pathname === '/comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput.name}`;
      fetchMeals(endpoint);
    }

    if (pathname === '/bebidas') {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput.name}`;
      fetchDrinks(endpoint);
    }
  };
  const handleClick = () => {
    switch (searchInput.searchBy) {
    case 'ingredientes':
      getIngredients();
      break;
    case 'receita':
      getRecipes();
      break;
    case 'primeira letra':
      if (searchInput.name.length === 1) {
        getFirstLetter();
      } else {
        global.alert(alertCaracterNumber);
      }
      break;
    // case searchInput:
    //   if (pathname === '/comidas') {
    //     const recipesFiltered = recipes
    //       .filter((recipe) => recipe.strMeal.includes(searchInput));
    //     return recipesFiltered;
    //   }
    //   if (pathname === '/bebidas') {
    //     const drinksFiltered = drinks
    //       .filter((recipe) => recipe.strDrink.includes(searchInput));
    //     return drinksFiltered;
    //   }
    //   break;
    default:
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      break;
    }
  };
  // aguardando para ser usada corretamente. o código está certo.
  // const handleFilter = () => {
  //   if (searchInput.name && pathname === '/comidas') {
  //     const recipeFiltered = recipes
  //       .filter((recipe) => recipe.strMeal.includes(searchInput.name));
  //     setRecipes(recipeFiltered);
  //   }
  //   if (searchInput.name && pathname === '/bebidas') {
  //     const drinksFiltered = drinks
  //       .filter((recipe) => recipe.strDrink.includes(searchInput.name));
  //     setDrinks(drinksFiltered);
  //   }
  // };

  const setFunctions = ({ target: { name, value } }) => {
    setsearchInput({ ...searchInput, [name]: (value).toLowerCase() });
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
          id="ingredient-search-radio"
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
          id="name-search-radio"
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
        id="first-letter-search-radio"
        name="searchBy"
        value="Primeira letra"
        type="radio"
        data-testid="first-letter-search-radio"
        onChange={ setFunctions }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
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
