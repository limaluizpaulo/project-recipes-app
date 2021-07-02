import React, { useState, useEffect } from 'react';
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

  const manageRender = () => {
    
  }

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
