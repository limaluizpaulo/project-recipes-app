// store = Context API
import { createContext } from 'react';

// INITIAL STATES ----------------------------------------------------------------
export const USER = {
  email: '',
  password: '',
};

export const RECIPES = {
  loading: true,
  foods: null,
  categoriesLimit: 5,
  cardsLimit: 12,
  recommendedLimit: 6,
  meals: [],
  categoriesMeals: [],
  drinks: [],
  categoriesDrinks: [],
  recipeDetail: [],
  recommendedRecipes: [],
};

export const SEARCH = {
  search: [],
};

// COMBINE -----------------------------------------------------------------------

export const INITIAL_STATE = { ...USER, ...RECIPES, ...SEARCH };

const store = createContext(INITIAL_STATE);

export default store;

// ACTIONS -----------------------------------------------------------------------

// USER
export const ADD_LOGIN = 'ADD_LOGIN'; // ACTION -> ADD_LOGIN
export const addLogin = ({ target: { name, value } }) => ({ // ACTION-CREATOR -> ADD_LOGIN
  type: ADD_LOGIN, payload: { name, value },
});

// RECIPES

export const UPDATE_LOADING = 'UPDATE_LOADING';
export const setLoading = (loading) => ({
  type: UPDATE_LOADING, payload: { loading },
});

export const ADD_RECIPES = 'ADD_RECIPES';
export const addRecipes = (meals, drinks, categoriesMeals, categoriesDrinks) => ({
  type: ADD_RECIPES, payload: { meals, drinks, categoriesMeals, categoriesDrinks },
});

export const DIRECT_PAGE = 'DIRECT_PAGE';
export const directPage = (foods) => ({
  type: DIRECT_PAGE, payload: { foods },
});

// DETAILS

export const ADD_RECIPE_DETAIL = 'ADD_RECIPE_DETAIL';
export const addRecDetail = (recipeDetail) => ({
  type: ADD_RECIPE_DETAIL, payload: { recipeDetail },
});

export const ADD_RD_RR_LOADING = 'ADD_RD_RR_LOADING'; // Add RecipeDetail, RecommendedRecipes, Loading
export const addRecipesDRLoading = (recipeDetail, recommendedRecipes, loading) => ({
  type: ADD_RD_RR_LOADING, payload: { recipeDetail, recommendedRecipes, loading },
});
