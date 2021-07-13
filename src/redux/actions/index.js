import { FETCH_API, FOOD_INGREDIENT, DRINK_INGREDIENT } from './actionTypes';

export const fetchApiAction = (payload) => ({
  type: FETCH_API,
  payload,
});

export const foodIngredients = (payload) => ({
  type: FOOD_INGREDIENT,
  payload,
});

export const drinkIngredients = (payload) => ({
  type: DRINK_INGREDIENT,
  payload,
});
