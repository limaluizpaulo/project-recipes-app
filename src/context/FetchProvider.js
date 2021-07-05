import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FetchContext from './FetchContext';

function FetchProvider({ children }) {
  const [typeFunc, setTypeFunc] = useState('');
  const [data, setData] = useState([]);
  const [imgRecipes, setImgRecipes] = useState('');
  const [nameRecipes, setNameRecipes] = useState('');
  const [categories, setCategories] = useState([]);

  const handleFoods = (radioButton, searchText) => {
    setNameRecipes('strMeal');
    setImgRecipes('strMealThumb');
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
