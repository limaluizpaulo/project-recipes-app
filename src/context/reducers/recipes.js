import { ADD_RECIPES, DIRECT_PAGE, ADD_RECIPE_DETAIL } from '../store';

const recipesReducer = (state, { type, payload }) => { // Desestruturação do Action
  switch (type) {
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
  default:
    return state;
  }
};

export default recipesReducer;
