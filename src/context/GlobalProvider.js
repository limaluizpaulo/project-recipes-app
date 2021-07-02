import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchAPI from '../services/fetchAPI';

function GlobalProvider({ children }) {
  const FoodsEndPoint = 'https://www.themealdb.com/api/json/v1/1/';
  const DrinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/';

  const [requestParams, setRequestParams] = useState({
    searchText: '',
    chosenFilter: '',
  });

  const [requestResult, setRequestResult] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    if (requestResult.meals) {
      setMeals(requestResult.meals);
    }
    if (requestResult.drinks) {
      setDrinks(requestResult.drinks);
    }
  }, [requestResult]);

  const manageRenderMeal = () => {
    if (meals.length === 1) {
      const mealId = meals[0].idMeal;
      return <Redirect to={ `/comidas/${mealId}` } />;
    } if (meals.length > 1) {
      return <div>renderizar com a lógica do vinicus</div>;
    }
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const manageRenderDrink = () => {
    if (drinks.length === 1) {
      const drinkId = drinks[0].idDrink;
      return <Redirect to={ `/bebidas/${drinkId}` } />;
    } if (drinks.length > 1) {
      return <div>renderizar com a lógica do vinicus</div>;
    }
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const handleChange = ({ target: { name, value } }) => {
    setRequestParams({ ...requestParams, [name]: value });
  };

  const asyncSetState = async (setState, baseEndPoint, chosenFilter, searchText) => {
    const result = await fetchAPI(baseEndPoint, chosenFilter, searchText);
    setState(result);
  };

  const contextValue = {
    FoodsEndPoint,
    DrinksEndPoint,
    requestParams,
    setRequestParams,
    handleChange,
    setRequestResult,
    meals,
    drinks,
    asyncSetState,
    manageRenderMeal,
    manageRenderDrink,
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
