import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './contextRecipes';

function ProviderRecipes({ children }) {
  const [goSearch, setGoSearch] = useState(false);
  const [goProfile, setGoProfile] = useState(false);
  const [title, setTitle] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodCategoryName, setFoodCategoryName] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [drinkCategoryName, setDrinkCategoryName] = useState([]);
  const [areas, setAreas] = useState(['']);
  const [foodByArea, setFoodByArea] = useState([]);
  const [drinkByArea, setDrinkByArea] = useState([]);
  const [searchInput, setsearchInput] = useState({
    // name: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [drinksRec, setDrinksRec] = useState([]);
  const [foodRec, setFoodRec] = useState([]);
  const [toggleFood, setToggleFood] = useState(false);
  const [randomFood, setRandomFood] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);
  const [searchByIngredient, setSearchByIngredient] = useState([]);

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

  const obj = {
    goSearch,
    goProfile,
    setGoProfile,
    setGoSearch,
    title,
    setTitle,
    recipes,
    drinks,
    setDrinks,
    searchInput,
    setsearchInput,
    setRecipes,
    isLoading,
    setIsLoading,
    drinksRec,
    setDrinksRec,
    foodRec,
    setFoodRec,
    // ingredientsDrinks,
    // measuresDrinks,
    // fullUrlDrinks,
    // logicFromDetailsDrink,
    foodCategory,
    setFoodCategory,
    foodCategoryName,
    setFoodCategoryName,
    drinkCategory,
    setDrinkCategory,
    drinkCategoryName,
    setDrinkCategoryName,
    toggleFood,
    setToggleFood,
    randomFood,
    setRandomFood,
    randomDrink,
    setRandomDrink,
    areas,
    setAreas,
    foodByArea,
    setFoodByArea,
    drinkByArea,
    setDrinkByArea,
    searchByIngredient,
    setSearchByIngredient,
  };

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
