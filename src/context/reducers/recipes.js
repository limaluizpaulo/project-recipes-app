import { ADD_RECIPES, DIRECT_PAGE,
  ADD_RD_LOADING, SET_FETCHON_DONE,
  ADD_RD_RR_LOADING, SET_DONE_LOADING, ADD_RD_FETCHON } from '../store';

const recipesReducer = (state, { type, payload }) => { // Desestruturação do Action
  switch (type) {
  case SET_FETCHON_DONE: { const { fetchOn, done } = payload;
    return { ...state, fetchOn, done };
  }
  case SET_DONE_LOADING: { const { done, loading } = payload;
    return { ...state, done, loading };
  }
  case ADD_RECIPES: {
    const { meals, drinks, categoriesMeals, categoriesDrinks } = payload;
    return { ...state, meals, drinks, categoriesMeals, categoriesDrinks };
  }
  case DIRECT_PAGE: { const { foods } = payload;
    return { ...state, foods };
  }
  case ADD_RD_LOADING: { const { recipeDetail, loading } = payload;
    return { ...state, recipeDetail, loading };
  }
  case ADD_RD_FETCHON: { const { recipeDetail, fetchOn } = payload;
    return { ...state, recipeDetail, fetchOn };
  }
  case ADD_RD_RR_LOADING: {
    const { recipeDetail, recommendedRecipes, loading } = payload;
    return { ...state, recipeDetail, recommendedRecipes, loading };
  }
  default:
    return state;
  }
};

export default recipesReducer;
