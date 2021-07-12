import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
import { apiRequestMeal, apiRequestDrink } from '../services/helpers/apiServises';
import messageAlert from '../services/helpers/alertMessage';

const RecipeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [radioValue, setValueRadio] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pathname, setPathname] = useState('');
  const [selectedTypeItem, setSelectedTypeItem] = useState('all');
  const [selectedFood, setSelectedFood] = useState();
  const [ingredients, setIngredients] = useState({});
  const [places, setPlaces] = useState([]);
  const [recipesByPlace, setRecipesByPlace] = useState([]);
  const [area, setArea] = useState();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [test, setTest] = useState({});
  // const [selectedIngredient, setSelectedIngredient] = useState('');
  const [previousIsExploreIngredients, setPreviousIsExploreIngredients] = useState(false);
  const [filterDrinksIngredients, setFilterDrinksIngredients] = useState([]);

  useEffect(() => {
    async function setDataRecipes() {
      const NUMBER_RENDER = 12;
      let response;

      if (pathname === '/comidas') {
        response = await apiRequestMeal(radioValue, inputValue) || [];
        setData(response.slice(0, NUMBER_RENDER));
      }
      if (pathname === '/bebidas') {
        response = await apiRequestDrink(radioValue, inputValue) || [];
        setData(response.slice(0, NUMBER_RENDER));
      }

      if (response && response.length === 0) {
        messageAlert(alert,
          'Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
    if (pathname) {
      setDataRecipes();
    }
  }, [radioValue, inputValue, pathname]);

  useEffect(() => {
    if (places.length > 0) {
      setArea(places[0]);
      const fetchRecipeByPlace = async () => {
        const DOZE = 12;
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/';
        const request = await fetch(endpoint);
        const result = await request.json();
        const recipes = result.meals.filter((_recipe, idx) => idx < DOZE);
        setRecipesByPlace(recipes);
      };
      fetchRecipeByPlace();
    }
  }, [places]);

  const createObjectFromFood = () => {
    const {
      idMeal,
      idDrink,
      strCategory,
      strAlcoholic,
      strArea,
      strMeal,
      strDrink,
      strDrinkThumb,
      strMealThumb,
    } = selectedFood;

    return ({
      id: idMeal || idDrink,
      type: idMeal ? 'comida' : 'bebida',
      area: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strDrinkThumb || strMealThumb,
    });
  };
  const objContext = {
    selectedFood,
    setSelectedFood,
    createObjectFromFood,
    data,
    setData,
    setValueRadio,
    setInputValue,
    setPathname,
    inputValue,
    radioValue,
    selectedTypeItem,
    setSelectedTypeItem,
    ingredients,
    setIngredients,
    places,
    setPlaces,
    recipesByPlace,
    setRecipesByPlace,
    area,
    setArea,
    ingredientsList,
    setIngredientsList,
    previousIsExploreIngredients,
    setPreviousIsExploreIngredients,
    filterDrinksIngredients,
    setFilterDrinksIngredients,
    test,
    setTest,
  };
  return (
    <RecipeContext.Provider value={objContext}>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeProvider;
