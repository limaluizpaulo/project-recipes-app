import { SAVE_USER } from './types';
import { getRecipes, getDrinks } from '../services/api';

export const actionSaveUser = (email) => ({
  type: SAVE_USER,
  payload: {
    email,
  },
});

export const actionGetUser = (email) => ({
  type: 'GET_USER',
  payload: {
    email,
  },
});

export const actionRecipes = () => (dispatch) => (
  getRecipes()
    .then((data) => dispatch({
      type: 'GET_RECIPES',
      payload: {
        data,
      },
    }))
);

export const actionDrinks = () => (dispatch) => (
  getDrinks()
    .then((data) => dispatch({
      type: 'GET_DRINKS',
      payload: {
        data,
      },
    }))
);
