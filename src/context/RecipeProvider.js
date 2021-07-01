import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipeContext from '.';
import {
  searchByFirstLetterApi,
  searchByIngredientsApi,
  searchByNameApi,
  recipesListApi,
  categoriesListApi,
  filterCategoryApi,
} from '../service/api';

export default function RecipeProvider({ children }) {
  const NUM_TWELVE = 12;
  const NUM_FIVE = 5;
  const textAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const { pathname } = useLocation();
  const [routeFromSearch, setRouteFromSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [redirectSearchBar, setRedirectSearchBar] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [toggleBtnCategories, setToggleBtnCategories] = useState(false);

  // Render all recipes
  useEffect(() => {
    async function requestAllRecipes() {
      const returnInitialRecipes = await recipesListApi(pathname);
      const limitedRecipes = returnInitialRecipes.slice(0, NUM_TWELVE);
      if (!toggleBtnCategories) {
        setRecipes(limitedRecipes);
      }
    }
    if (pathname === '/comidas' || pathname === '/bebidas') {
      requestAllRecipes();
    }
  }, [pathname, toggleBtnCategories]);

  // Render Categories
  useEffect(() => {
    async function requestCategories() {
      const returnCategories = await categoriesListApi(pathname);
      const limitedCategories = returnCategories.slice(0, NUM_FIVE);
      setCategories(limitedCategories);
    }
    if (pathname === '/comidas' || pathname === '/bebidas') {
      requestCategories();
    }
  }, [pathname]);

  // Render filter by category
  useEffect(() => {
    async function requestFilterByCategory() {
      const returnCategory = await filterCategoryApi(selectedCategory, pathname);
      if (returnCategory !== null) {
        const limitedRecipes = returnCategory.slice(0, NUM_TWELVE);
        if (toggleBtnCategories) {
          setRecipes(limitedRecipes);
        }
      }
    }
    if (pathname === '/comidas' || pathname === '/bebidas') {
      requestFilterByCategory();
    }
  }, [selectedCategory, toggleBtnCategories]);

  // Render search recipes
  useEffect(() => {
    async function requestByIngredients() {
      const returnIngredients = await searchByIngredientsApi(inputValue, routeFromSearch);
      if (returnIngredients === null) {
        return alert(textAlert);
      }
      const limitedRecipes = returnIngredients.slice(0, NUM_TWELVE);
      setRecipes(limitedRecipes);
    }
    const requestByName = async () => {
      const returnName = await searchByNameApi(inputValue, routeFromSearch);
      if (returnName === null) {
        return alert(textAlert);
      }
      const limitedRecipes = returnName.slice(0, NUM_TWELVE);
      setRecipes(limitedRecipes);
    };
    const requestByLetter = async () => {
      const returnLetter = await searchByFirstLetterApi(inputValue, routeFromSearch);
      if (returnLetter === null) {
        return alert(textAlert);
      }
      const limitedRecipes = returnLetter.slice(0, NUM_TWELVE);
      setRecipes(limitedRecipes);
    };
    if (redirectSearchBar) {
      if (checkedRadio === 'Ingredientes') {
        requestByIngredients();
        setRedirectSearchBar(false);
      } else if (checkedRadio === 'Nome') {
        requestByName();
        setRedirectSearchBar(false);
      } else if (checkedRadio === 'Primeira letra') {
        requestByLetter();
        setRedirectSearchBar(false);
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
        categories,
        setSelectedCategory,
        selectedCategory,
        setToggleBtnCategories,
        toggleBtnCategories,
      } }
    >
      {recipes.length === 1 && redirectDetailPage()}
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
