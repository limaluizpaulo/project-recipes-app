import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchContext from './FetchContext';
import { fetchAreaOrigens } from '../services/Api';

function FetchProvider({ children }) {
  const [typeFunc, setTypeFunc] = useState('');
  const [data, setData] = useState([]);
  const [imgRecipes, setImgRecipes] = useState('');
  const [nameRecipes, setNameRecipes] = useState('');
  const [idRecip, setIdRecip] = useState('');
  const [categories, setCategories] = useState([]);
  // const [toggle, setToggle] = useState(true);
  const [ingredient, setIngredient] = useState([]);
  const [filterMeals, setFilterMeals] = useState(null);
  const [filterDrink, setFilterDrink] = useState(null);
  const [areasFood, setAreasFood] = useState([]);

  useEffect(() => {
    const renderRecipes = () => {
      fetchAreaOrigens().then((res) => setAreasFood(res));
    };
    renderRecipes();
  }, []);

  const handleFoods = (radioButton, searchText) => {
    setNameRecipes('strMeal');
    setImgRecipes('strMealThumb');
    setIdRecip('idMeal');
    if (radioButton === 'ingrediente') {
      return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
        .then((res) => res.json())
        .then(({ meals }) => setData(meals));
    }

    if (radioButton === 'nome') {
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then((res) => res.json())
        .then(({ meals }) => setData(meals));
    }

    // função tirada da ajuda do Lucas Martins no Slack
    const alertMessage = (func, message) => func(message);

    if (searchText.length > 1) {
      alertMessage(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }

    if (radioButton === 'primeira letra') {
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
        .then((res) => res.json())
        .then(({ meals }) => setData(meals));
    }
  };

  const handleDrinks = (radioButton, searchText) => {
    setNameRecipes('strDrink');
    setImgRecipes('strDrinkThumb');
    setIdRecip('idDrink');
    if (radioButton === 'ingrediente') {
      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`)
        .then((res) => res.json())
        .then(({ drinks }) => setData(drinks));
    }

    if (radioButton === 'nome') {
      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then((res) => res.json())
        .then(({ drinks }) => setData(drinks));
    }

    // função tirada da ajuda do Lucas Martins no Slack
    const alertMessage = (func, message) => func(message);

    if (searchText.length > 1) {
      alertMessage(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }

    if (radioButton === 'primeira letra') {
      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
        .then((res) => res.json())
        .then(({ drinks }) => setData(drinks));
    }
  };

  console.log('teste');

  const contextValue = {
    typeFunc,
    setTypeFunc,
    handleFoods,
    handleDrinks,
    data,
    setData,
    imgRecipes,
    setImgRecipes,
    nameRecipes,
    setNameRecipes,
    categories,
    setCategories,
    idRecip,
    setIdRecip,
    ingredient,
    setIngredient,
    setFilterMeals,
    filterMeals,
    setFilterDrink,
    filterDrink,
    areasFood,
  };

  return (
    <FetchContext.Provider value={ contextValue }>
      { children}
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FetchProvider;
