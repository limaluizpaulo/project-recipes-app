import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  fetchAPI, getCategories,
} from '../services/fetchAPI';

const FoodsEndPoint = 'https://www.themealdb.com/api/json/v1/1/';
const DrinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/';
const initialParams = { chosenFilter: 'search.php?s=', searchText: '' };

function GlobalProvider({ children }) {
  // armazena os paramentros vindos dos inputs para requisição da API.
  const [requestParams, setRequestParams] = useState(initialParams);
  // armazena o resultado da api (fetchAPI). DidMount e Botão de 'pesquisar'.
  const [requestResult, setRequestResult] = useState({ drinks: [], meals: [] });
  // armazena o resultado da api de categorias (getCategories).
  const [categories, setCategories] = useState({ drinks: [], meals: [] });
  // armazena o requestResult sob a condição da sua chave (drinks ou meals).
  const [drinks, setDrinks] = useState([]);
  // armazena o requestResult sob a condição da sua chave (drinks ou meals).
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const { chosenFilter, searchText } = initialParams;
    async function fetchState() {
      setCategories(await getCategories());
      setRequestResult(await fetchAPI(FoodsEndPoint, chosenFilter, searchText));
      setRequestResult(await fetchAPI(DrinksEndPoint, chosenFilter, searchText));
    } fetchState();
  }, []);

  useEffect(() => {
    if (requestResult.meals) {
      setMeals(requestResult.meals);
    }
    if (requestResult.drinks) {
      setDrinks(requestResult.drinks);
    }
    if (!requestResult[Object.keys(requestResult)[0]]) {
      global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [requestResult]);

  const handleChange = ({ target: { name, value } }) => {
    setRequestParams({ ...requestParams, [name]: value });
  };

  const asyncSetState = async (baseEndPoint) => {
    const { chosenFilter, searchText } = requestParams;
    const result = await fetchAPI(baseEndPoint, chosenFilter, searchText);
    if (result) {
      setRequestResult(result);
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
    handleChange,
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
