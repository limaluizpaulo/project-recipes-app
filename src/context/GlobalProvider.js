import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  fetchAPI, getCategories, getMealsRecipes, getDrinksRecipes,
} from '../services/fetchAPI';

const FoodsEndPoint = 'https://www.themealdb.com/api/json/v1/1/';
const DrinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/';

function GlobalProvider({ children }) {
  const [requestParams, setRequestParams] = useState({
    chosenFilter: '', searchText: '' });

  const [requestResult, setRequestResult] = useState({ drinks: [], meals: [] });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState({ drinks: [], meals: [] });
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function fetchState() {
      setCategories(await getCategories());
      setMeals(await getMealsRecipes());
      setDrinks(await getDrinksRecipes());
    } fetchState();
  }, []);

  useEffect(() => {
    if (requestResult.meals) {
      setMeals(requestResult.meals);
    }
    if (requestResult.drinks) {
      setDrinks(requestResult.drinks);
    }
    if (requestResult.meals === null || requestResult.drinks === null) {
      global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [requestResult]);

  const handleChange = ({ target: { name, value } }) => {
    setRequestParams({ ...requestParams, [name]: value });
  };

  const syncSetState = async (baseEndPoint) => {
    const { chosenFilter, searchText } = requestParams;
    const result = await fetchAPI(baseEndPoint, chosenFilter, searchText);
    if (result) {
      setRequestResult(result);
    }
  };

  const detailsSyncSetState = async (endPoint) => {
    const result = await fetchAPI(endPoint, '', '');
    if (result) {
      setDetails(result);
    }
  };

  const manageRenderMeal = (cardList) => {
    if (meals.length === 1) {
      const mealId = meals[0].idMeal;
      return <Redirect to={ `/comidas/${mealId}` } />;
    } if (meals.length > 1) {
      return cardList;
    }
  };

  const manageRenderDrink = (cardList) => {
    if (drinks.length === 1) {
      const drinkId = drinks[0].idDrink;
      return <Redirect to={ `/bebidas/${drinkId}` } />;
    } if (drinks.length > 1) {
      return cardList;
    }
  };

  const contextValue = {
    FoodsEndPoint,
    DrinksEndPoint,
    requestParams,
    meals,
    drinks,
    categories,
    details,
    handleChange,
    syncSetState,
    manageRenderMeal,
    manageRenderDrink,
    setDetails,
    detailsSyncSetState,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

export default GlobalProvider;

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
