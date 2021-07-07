/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  fetchAPI, getCategories, categoryFilter,
} from '../services/fetchAPI';

const foodsEndPoint = 'https://www.themealdb.com/api/json/v1/1/';
const drinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/';
const initialParams = { chosenFilter: 'search.php?s=', searchText: '' };

function GlobalProvider({ children }) {
  const [baseEndPoint, setBaseEndPoint] = useState(foodsEndPoint);
  const [requestParams, setRequestParams] = useState(initialParams);
  const [requestResult, setRequestResult] = useState({ drinks: [], meals: [] });
  const [categories, setCategories] = useState({ drinks: [], meals: [] });
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [toggle, setToggle] = useState({
    categoryName: '', status: false, backup: { drinks, meals } });

  useEffect(() => {
    async function fetchCategories() {
      const { chosenFilter, searchText } = initialParams;
      setCategories(await getCategories());
      setRequestResult(await fetchAPI(foodsEndPoint, chosenFilter, searchText));
      setRequestResult(await fetchAPI(drinksEndPoint, chosenFilter, searchText));
    } fetchCategories();
  }, []);

  useEffect(() => {
    const { chosenFilter, searchText } = initialParams;
    async function fetchResults() {
      setRequestResult(await fetchAPI(baseEndPoint, chosenFilter, searchText));
    } fetchResults();
  }, [baseEndPoint]);

  useEffect(() => {
    if (requestResult.meals) {
      setMeals(requestResult.meals);
      setToggle({
        ...toggle, backup: { ...toggle.backup, meals: requestResult.meals } });
    }
    if (requestResult.drinks) {
      setDrinks(requestResult.drinks);
      setToggle({
        ...toggle, backup: { ...toggle.backup, drinks: requestResult.drinks } });
    }
    if (!requestResult[Object.keys(requestResult)[0]]) {
      global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [requestResult]);

  const handleChange = ({ target: { name, value } }) => {
    setRequestParams({ ...requestParams, [name]: value });
  };

  const resetParams = () => {
    setRequestParams(initialParams);
  };

  const handleToggle = (categoryName, status) => {
    if (categoryName === toggle.categoryName || toggle.categoryName === '') {
      setToggle({ ...toggle, categoryName, status });
    } else {
      setToggle({ ...toggle, categoryName, status });
    }
  };

  const updateEndPoint = (type) => {
    if (type === 'drinks') {
      setBaseEndPoint(drinksEndPoint);
    } else setBaseEndPoint(foodsEndPoint);
  };

  const asyncSetState = async () => {
    const { chosenFilter, searchText } = requestParams;
    const result = await fetchAPI(baseEndPoint, chosenFilter, searchText);
    if (result) {
      setRequestResult(result);
    }
  };

  const manageRenderMeal = (cardList) => {
    if (meals.length === 1 && requestParams.searchText.length > 0) {
      const mealId = meals[0].idMeal;
      return <Redirect to={ `/comidas/${mealId}` } />;
    } if (meals.length >= 1) {
      return cardList;
    }
  };

  const manageRenderDrink = (cardList) => {
    if (drinks.length === 1 && requestParams.searchText.length > 0) {
      const drinkId = drinks[0].idDrink;
      return <Redirect to={ `/bebidas/${drinkId}` } />;
    } if (drinks.length >= 1) {
      return cardList;
    }
  };

  const filterCategory = async (category) => {
    let resultFilter = {};
    if (category) {
      resultFilter = await categoryFilter(baseEndPoint, category);
      if (resultFilter.meals) {
        setMeals(resultFilter[Object.keys(resultFilter)[0]]);
      } else {
        setDrinks(resultFilter[Object.keys(resultFilter)[0]]);
      }
    } else if (baseEndPoint === foodsEndPoint) {
      setMeals(toggle.backup.meals);
    } else {
      setDrinks(toggle.backup.drinks);
    }
  };

  const contextValue = {
    baseEndPoint,
    requestParams,
    meals,
    drinks,
    categories,
    toggle,
    resetParams,
    updateEndPoint,
    handleChange,
    asyncSetState,
    manageRenderMeal,
    manageRenderDrink,
    filterCategory,
    handleToggle,
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
