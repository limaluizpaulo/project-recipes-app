import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './contextRecipes';

function ProviderRecipes({ children }) {
  const [goSearch, setGoSearch] = useState(false);
  const [goProfile, setGoProfile] = useState(false);
  const [title, setTitle] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchInput, setsearchInput] = useState({
    name: '',
  });

  const obj = {
    goSearch,
    goProfile,
    setGoProfile,
    setGoSearch,
    title,
    setTitle,
    recipes,
    drinks,
    searchInput,
    setsearchInput,
  };

  const fetchFoodRecipes = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setRecipes(results.meals)));
  };

  const fetchDrinkRecipes = () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setDrinks(results.drinks)));
  };

  useEffect(() => {
    fetchFoodRecipes();
    // fetchDrinkRecipes();
  }, []);

  useEffect(() => {
    fetchDrinkRecipes();
  }, []);

  return (
    <ContextRecipes.Provider value={ { ...obj } }>
      { children }
    </ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderRecipes;
