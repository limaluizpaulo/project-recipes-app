import { ADD_RECIPES, DIRECT_PAGE,
  ADD_RECIPE_DETAIL, SET_FETCHON,
  SET_LOADING, SET_DONE, ADD_RD_RR_LOADING, SET_LOADING_DONE } from '../store';

const recipesReducer = (state, { type, payload }) => { // Desestruturação do Action
  switch (type) {
  case SET_FETCHON: { const { fetchOn } = payload;
    return { ...state, fetchOn };
  }
  case SET_LOADING: { const { loading } = payload;
    return { ...state, loading };
  }
  case SET_DONE: { const { done } = payload;
    return { ...state, done };
  }
  case SET_LOADING_DONE: { const { loading, done } = payload;
    return { ...state, loading, done };
  }
  case ADD_RECIPES: {
    const { meals, drinks, categoriesMeals, categoriesDrinks } = payload;
    return { ...state, meals, drinks, categoriesMeals, categoriesDrinks };
  }
  case DIRECT_PAGE: { const { foods } = payload;
    return { ...state, foods };
  }
  case ADD_RECIPE_DETAIL: { const { recipeDetail } = payload;
    return { ...state, recipeDetail };
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
