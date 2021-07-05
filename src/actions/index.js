import { SAVE_USER } from './types';
import { getRecipes, getDrinks, getRecipesByIngredients,
  getRecipesByName, getDrinksByIngredients, getDrinksByName,
  getRecipesByFirstLetter, getDrinksByFirstLetter } from '../services/api';

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

export const saveInputIngredientes = (input) => ({
  type: 'SAVE_INPUT_INGREDIENTES',
  payload: {
    input,
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

export const actionRecipesByIngredients = (ingredients) => (dispatch) => (
  getRecipesByIngredients(ingredients)
    .then((data) => dispatch({
      type: 'RECIPES_INGREDIENTS',
      payload: {
        data,
      },
    }))
    // .catch(() => (
    //   alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
    // ))
);

export const actionRecipesByName = (name) => (dispatch) => (
  getRecipesByName(name)
    .then((data) => dispatch({
      type: 'RECIPES_NAME',
      payload: {
        data,
      },
    }))
);

export const actionRecipesByFirstLetter = (firstLetter) => (dispatch) => (
  getRecipesByFirstLetter(firstLetter)
    .then((data) => dispatch({
      type: 'RECIPES_FIRST_LETTER',
      payload: {
        data,
      },
    }))
);

export const actionDrinksByIngredients = (ingredients) => (dispatch) => (
  getDrinksByIngredients(ingredients)
    .then((data) => dispatch({
      type: 'DRINKS_INGREDIENTS',
      payload: {
        data,
      },
    }))
);

export const actionDrinksByName = (name) => (dispatch) => (
  getDrinksByName(name)
    .then((data) => dispatch({
      type: 'DRINKS_NAME',
      payload: {
        data,
      },
    }))
);

export const actionDrinksByFirstLetter = (firstLetter) => (dispatch) => (
  getDrinksByFirstLetter(firstLetter)
    .then((data) => dispatch({
      type: 'DRINKS_FIRST_LETTER',
      payload: {
        data,
      },
    }))
);
