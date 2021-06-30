import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '.';
import {
  searchByFirstLetterApi,
  searchByIngredientsApi,
  searchByNameApi,
} from '../service/api';

export default function RecipeProvider({ children }) {
  const lengthNumRecipes = 12;
  const textAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const [routeFromSearch, setRouteFromSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [redirectSearchBar, setRedirectSearchBar] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function requestByIngredients() {
      const returnIngredients = await searchByIngredientsApi(inputValue, routeFromSearch);
      if (returnIngredients === null) {
        return alert(textAlert);
      }
      const limitedRecipes = returnIngredients.slice(0, lengthNumRecipes);
      setRecipes(limitedRecipes);
    }
    const requestByName = async () => {
      const returnName = await searchByNameApi(inputValue, routeFromSearch);
      if (returnName === null) {
        return alert(textAlert);
      }
      const limitedRecipes = returnName.slice(0, lengthNumRecipes);
      setRecipes(limitedRecipes);
    };
    const requestByLetter = async () => {
      const returnLetter = await searchByFirstLetterApi(inputValue, routeFromSearch);
      if (returnLetter === null) {
        return alert(textAlert);
      }
      const limitedRecipes = returnLetter.slice(0, lengthNumRecipes);
      setRecipes(limitedRecipes);
    };
    if (redirectSearchBar) {
      if (checkedRadio === 'Ingredientes') {
        requestByIngredients();
      } else if (checkedRadio === 'Nome') {
        requestByName();
      } else if (checkedRadio === 'Primeira letra') {
        requestByLetter();
      }
    }
  }, [redirectSearchBar]);

  function redirectDetailPage() {
    if (routeFromSearch === '/comidas') {
      return <Redirect to={ `${routeFromSearch}/${recipes[0].idMeal}` } />;
    }
    if (routeFromSearch === '/bebidas') {
      return <Redirect to={ `${routeFromSearch}/${recipes[0].idDrink}` } />;
    }
  }

  return (
    <RecipeContext.Provider
      value={ {
        showSearch,
        setShowSearch,
        setCheckedRadio,
        setInputValue,
        setRedirectSearchBar,
        setRouteFromSearch,
        routeFromSearch,
        recipes,
      } }
    >
      {console.log(recipes)}
      {recipes.length === 1 && redirectDetailPage()}
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
