import FETCH_API from './actionTypes';

const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const fetchApiAction = (payload) => ({
  type: FETCH_API,
  payload,
});

export const addIngredients = (payload) => ({
  type: ADD_INGREDIENT,
  payload,
});
