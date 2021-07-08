import { ADD_RECIPES, DIRECT_PAGE,
  ADD_RECIPE_DETAIL, UPDATE_LOADING, ADD_RD_RR_LOADING } from '../store';

const recipesReducer = (state, { type, payload }) => { // Desestruturação do Action
  switch (type) {
  case UPDATE_LOADING: {
    const { loading } = payload;
    return {
      ...state,
      loading,
    };
  }
  case ADD_RECIPES: {
    const { meals, drinks, categoriesMeals, categoriesDrinks } = payload;
    return {
      ...state,
      meals,
      drinks,
      categoriesMeals,
      categoriesDrinks,
    };
  }
  case DIRECT_PAGE: {
    const { foods } = payload;
    return {
      ...state,
      foods,
    };
  }
  case ADD_RECIPE_DETAIL: {
    const { recipeDetail } = payload;
    return {
      ...state,
      recipeDetail,
    };
  }
  case ADD_RD_RR_LOADING: {
    const { recipeDetail, recommendedRecipes, loading } = payload;
    return {
      ...state,
      recipeDetail,
      recommendedRecipes,
      loading,
    };
  }
  default:
    return state;
  }
};

export default recipesReducer;
