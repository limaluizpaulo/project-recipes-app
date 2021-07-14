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
  const [searchInput, setsearchInput] = useState({
    // name: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [drinksRec, setDrinksRec] = useState([]);
  // const [ingredientsDrinks, setIngredientsDrinks] = useState();
  // const [measuresDrinks, setMeasuresDrinks] = useState();
  // const [fullUrlDrinks, setFullUrlDrinks] = useState();

  // const logicFromDetailsDrink = () => {
  //   const listIngredients = Object.keys(drinks[0])
  //     .filter((drink) => drink.includes('Ingredient'));
  //   const ingredients = [];
  //   const drinksKeys = Object.keys(drinks[0]);
  //   for (let j = 0; j < drinksKeys.length; j += 1) {
  //     for (let i = 0; i < listIngredients.length; i += 1) {
  //       if (drinksKeys[j] === listIngredients[i]) {
  //         ingredients.push(drinks[0][drinksKeys[j]]);
  //       }
  //     }
  //   }

  //   const ingredientsFinal = ingredients.filter((ing) => ing !== null);
  //   setIngredientsDrinks(ingredientsFinal);

  //   const listMeasures = Object.keys(drinks[0])
  //     .filter((drink) => drink.includes('Measure'));
  //   const measures = [];
  //   const measure = Object.keys(drinks[0]);
  //   for (let j = 0; j < measure.length; j += 1) {
  //     for (let i = 0; i < listMeasures.length; i += 1) {
  //       if (measure[j] === listMeasures[i]) {
  //         measures.push(drinks[0][measure[j]]);
  //       }
  //     }
  //   }

  //   const measuresFinal = measures.filter((ing) => ing !== ' ');
  //   setMeasuresDrinks(measuresFinal);

  //   const INDEX_NUMBER = 3;
  //   const urlVideo = drinks[0].strVideo.split('/');
  //   urlVideo.splice(urlVideo.indexOf(INDEX_NUMBER), 1);
  //   // urlVideo.forEach((u) => u.inclued)
  //   const urlVideo2 = drinks[0].strVideo.split('/');
  //   const partUrl = urlVideo2[3].split('?');
  //   const partUrl2 = partUrl[1].split('=');
  //   partUrl2.shift();
  //   console.log(partUrl2);
  //   let fullUrl = '';

  //   partUrl[0] = 'embed';
  //   urlVideo.push(partUrl[0]);
  //   urlVideo.push(partUrl2);
  //   fullUrl = `${urlVideo[0]}//${urlVideo[2]}/${urlVideo[3]}/${urlVideo[4]}`;
  //   setFullUrlDrinks(fullUrl);
  // };
  const [toggleFood, setToggleFood] = useState(false);
  const [randomFood, setRandomFood] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);
  const [searchByIngredient, setSearchByIngredient] = useState([]);

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
    searchByIngredient,
    setSearchByIngredient,
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
