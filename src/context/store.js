// store = Context API
import { createContext } from 'react';

// INITIAL STATES ----------------------------------------------------------------
export const USER = {
  email: '',
  password: '',
};

export const RECIPES = {
  meals: [],
  categoryMeals: [],
  drinks: [],
  categoryDrinks: [],
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
export const addLogin = (email, password) => ({ // ACTION-CREATOR -> ADD_LOGIN
  type: ADD_LOGIN, payload: { email, password },
});
