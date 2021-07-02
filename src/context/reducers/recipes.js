import { ADD_RECIPES, DIRECT_PAGE } from '../store';

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
  default:
    return state;
  }
};

export default recipesReducer;
