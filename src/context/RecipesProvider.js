import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';

import fetchFood,
{ FOOD_BY_INGREDIENT, FOOD_BY_LETTER, FOOD_BY_NAME } from '../services/FoodAPI';
import fetchDrink,
{ DRINK_BY_INGREDIENT, DRINK_BY_LETTER, DRINK_BY_NAME } from '../services/DrinkAPI';
import { CATEGORY_FILTER_FOOD, CATEGORY_FILTER_DRINK } from '../services/Categorys';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassowd] = useState('');

  const successLogin = (emailText, passwordText) => {
    setEmail(emailText);
    setPassowd(passwordText);

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  // searchBar
  const [searchInput, setSearchInput] = useState('');
  const [endpoint, setEndpoint] = useState();
  const [type, setType] = useState(useHistory().location.pathname);
  const [history] = useState(useHistory());
  const [results, setResults] = useState(<div> </div>);

  const foodOrDrink = {
    letter: type === '/comidas' ? FOOD_BY_LETTER : DRINK_BY_LETTER,
    ingredient: type === '/comidas' ? FOOD_BY_INGREDIENT : DRINK_BY_INGREDIENT,
    name: type === '/comidas' ? FOOD_BY_NAME : DRINK_BY_NAME,
    categoryEndpoint: type === '/comidas' ? CATEGORY_FILTER_FOOD : CATEGORY_FILTER_DRINK,
    fetchRecipe: type === '/comidas' ? fetchFood : fetchDrink,
    idType: type === '/comidas' ? 'meals' : 'drinks',
    idRecipe: type === '/comidas' ? 'Meal' : 'Drink',
  };

  function handleSingleReturn(data) {
    const recipe = data[0];
    const link = `${type}/${recipe[`id${foodOrDrink.idRecipe}`]}`;
    history.push(link);
  }
  //

  // Receitas Feitas
  function doneRecipes(recipe) {
    console.log(recipe);
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    localStorage.setItem('doneRecipes', JSON.stringify([...done, {
      id: recipe.idMeal,
      type: recipe.strCategory,
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: null,
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: null,
      tags: recipe.strTags,
    }]));
  }
  //

  // CategoryOptions

  const [categoryFilter, setCategoryFilter] = useState('');

  // CategoryOptions

  const context = {
    email,
    password,
    successLogin,
    foodOrDrink,
    handleSingleReturn,
    type,
    setType,
    searchInput,
    setSearchInput,
    endpoint,
    setEndpoint,
    results,
    setResults,
    doneRecipes,
    categoryFilter,
    setCategoryFilter,
  };

  return (
    <RecipesContext.Provider
      value={ context }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
