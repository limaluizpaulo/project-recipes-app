export const [USERLOGIN, DRINKS, FOODS, RANDOM] = ['USERLOGIN', 'DRINKS', 'FOODS', 'RANDOM'];

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

const actionGetDrinks = (payload) => ({
  type: DRINKS,
  payload,
});

const actionGetRandom = (payload) => ({
  type: RANDOM,
  payload,
});

export function getFoods(value, callback) {
  return (dispatch) => callback(value)
    .then((food) => dispatch(actionGetFoods(food)));
}

export function getDrinks(value, callback) {
  return (dispatch) => callback(value)
    .then((drink) => dispatch(actionGetDrinks(drink)));
}

export function getRandom(callback) {
  return (dispatch) => callback()
    .then((random) => dispatch(actionGetRandom(random)));
}