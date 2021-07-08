import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipeContext from '.';
import {
  searchByFirstLetterApi,
  searchByIngredientsApi,
  searchByNameApi,
  // recipesListApi,
  categoriesListApi,
  // filterCategoryApi,
  searchIngredients,
  searchAreas,
} from '../service/api';

export default function RecipeProvider({ children }) {
  const MAX_NUMBER_OF_ITEMS = 12;
  const MAX_NUMBER_OF_CATEGORIES = 5;
  const textAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const { pathname } = useLocation();
  const [routeFromSearch, setRouteFromSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [redirectSearchBar, setRedirectSearchBar] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [toggleBtnCategories, setToggleBtnCategories] = useState(false);
  const [searchIngredient, setSearchIngredient] = useState('');
  const [idDetail, setIdDetail] = useState('');
  const [idProgress, setIdProgress] = useState('');
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Render all recipes
  // useEffect(() => {
  //   async function requestAllRecipes() {
  //     if (toggleBtnCategories === false) {
  //       const returnInitialRecipes = await recipesListApi(pathname);
  //       const limitedRecipes = returnInitialRecipes.slice(0, NUM_TWELVE);
  //       setRecipes(limitedRecipes);
  //     }
  //   }
  //   if (pathname === '/comidas' || pathname === '/bebidas') {
  //     requestAllRecipes();
  //   }
  // }, [pathname, toggleBtnCategories]);

  // Render Categories
  useEffect(() => {
    async function requestCategories() {
      const returnCategories = await categoriesListApi(pathname);
      const limitedCategories = returnCategories.slice(0, MAX_NUMBER_OF_CATEGORIES);
      setCategories(limitedCategories);
    }
    if (pathname === '/comidas' || pathname === '/bebidas') {
      requestCategories();
    }
  }, [pathname]);

  // Render filter by category
  // useEffect(() => {
  //   async function requestFilterByCategory() {
  //     if (toggleBtnCategories) {
  //       const returnCategory = await filterCategoryApi(selectedCategory, pathname);
  //       if (returnCategory !== null) {
  //         const limitedRecipes = returnCategory.slice(0, NUM_TWELVE);
  //         setRecipes(limitedRecipes);
  //       }
  //     }
  //   }
  //   if (pathname === '/comidas' || pathname === '/bebidas') {
  //     requestFilterByCategory();
  //   }
  // }, [selectedCategory, toggleBtnCategories]);

  // search ingredients
  useEffect(() => {
    const getIngredients = async () => {
      setIngredients(await searchIngredients(pathname));
    };
    getIngredients();
  }, [pathname]);

  // search areas
  useEffect(() => {
    const getAreas = async () => {
      setAreas(await searchAreas());
    };
    getAreas();
  }, []);

  // render recipes filtered by ingredients
  // useEffect(() => {
  //   const searchByIngredients = async () => {
  //     const returnIngredients = await
  //     searchByIngredientsApi(searchIngredient, pathname);
  //     // console.log(searchIngredient);
  //     // console.log(pathname);
  //     const limitedRecipes = returnIngredients.slice(0, NUM_TWELVE);
  //     setRecipes(limitedRecipes);
  //     setSearchIngredient('');
  //   };
  //   if (searchIngredient !== '') {
  //     searchByIngredients();
  //   }
  // }, [pathname, searchIngredient]);

  // Render search recipes
  useEffect(() => {
    async function requestByIngredients() {
      const returnIngredients = await searchByIngredientsApi(inputValue, routeFromSearch);
      if (returnIngredients === null) {
        return global.alert(textAlert);
      }
      const limitedRecipes = returnIngredients.slice(0, MAX_NUMBER_OF_ITEMS);
      setRecipes(limitedRecipes);
    }
    const requestByName = async () => {
      const returnName = await searchByNameApi(inputValue, routeFromSearch);
      if (returnName === null) {
        return global.alert(textAlert);
      }
      const limitedRecipes = returnName.slice(0, MAX_NUMBER_OF_ITEMS);
      setRecipes(limitedRecipes);
    };
    const requestByLetter = async () => {
      const returnLetter = await searchByFirstLetterApi(inputValue, routeFromSearch);
      if (returnLetter === null) {
        return global.alert(textAlert);
      }
      const limitedRecipes = returnLetter.slice(0, MAX_NUMBER_OF_ITEMS);
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
        isFavorite,
        setIsFavorite,
        recipeInProgress,
        setRecipeInProgress,
        idProgress,
        setIdProgress,
        idDetail,
        setIdDetail,
        areas,
        showSearch,
        setShowSearch,
        setCheckedRadio,
        setInputValue,
        setRecipes,
        setRedirectSearchBar,
        setRouteFromSearch,
        routeFromSearch,
        recipes,
        categories,
        ingredients,
        searchIngredient,
        setSearchIngredient,
        setSelectedCategory,
        selectedCategory,
        setToggleBtnCategories,
        toggleBtnCategories,
        checkedIngredients,
        setCheckedIngredients,
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
