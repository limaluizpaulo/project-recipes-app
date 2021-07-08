import { listByCategories } from '../../services/services';
import fetchByArea from '../../services/fetchByArea';

export const [
  USERLOGIN,
  DRINKS,
  FOODS,
  RANDOM,
  INGREDIENTS,
  FOOD_CATEGORIES,
  DRINK_CATEGORIES,
  AREA,
  FOODSAREA,
] = [
  'USERLOGIN',
  'DRINKS',
  'FOODS',
  'RANDOM',
  'INGREDIENTS',
  'FOOD_CATEGORIES',
  'DRINK_CATEGORIES',
  'AREA',
  'FOODSAREA',
];

export function userLogin(payload) {
  return {
    type: USERLOGIN,
    payload,
  };
}

const actionGetFoods = (payload) => ({
  type: FOODS,
  payload,
});

const actionGetAreas = (payload) => ({
  type: FOODSAREA,
  payload,
});

const actionGetDrinks = (payload) => ({
  type: DRINKS,
  payload,
});

const actionGetRandom = (payload) => ({
  type: RANDOM,
  payload,
});

const actionGetIngredients = (payload) => ({
  type: INGREDIENTS,
  payload,
});

const actionSortCategoriesFood = (payload) => ({
  type: FOOD_CATEGORIES,
  payload,
});

const actionSortCategoriesDrink = (payload) => ({
  type: DRINK_CATEGORIES,
  payload,
});

export const areaList = (areas) => ({
  type: AREA,
  areas,
});

export function setArea() {
  return async (dispatch) => {
    const area = await fetchByArea();
    return dispatch(areaList(area));
  };
}

// const actionGetDefault = (payload) => ({})

export function getFoods(value, callback) {
  return (dispatch) => callback(value)
    .then((food) => dispatch(actionGetFoods(food)));
}

export function getAreas(value, callback) {
  return (dispatch) => callback(value)
    .then((area) => dispatch(actionGetAreas(area)));
}

export function getDrinks(value, callback) {
  return (dispatch) => callback(value)
    .then((drink) => dispatch(actionGetDrinks(drink)));
}

export function getRandom(callback) {
  return (dispatch) => callback()
    .then((random) => dispatch(actionGetRandom(random)));
}

export function getIngredient(callback) {
  return (dispatch) => callback()
    .then((ingredient) => dispatch(actionGetIngredients(ingredient)));
}

export function getCategory(category, type) {
  const actionCallback = type === 'meal'
    ? actionSortCategoriesFood : actionSortCategoriesDrink;
  return (dispatch) => listByCategories(category, type)
    .then((list) => dispatch(actionCallback(list)));
}
