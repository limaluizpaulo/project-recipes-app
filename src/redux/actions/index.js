import { MealServiceIngredientsAPI,
  MealServiceNameAPI,
  MealServiceFirstLetterAPI } from '../../services/MealRecipesAPI';

export const [USERLOGIN, FOODS] = ['USERLOGIN', 'FOODS'];

export function userLogin(payload) {
  return {
    type: USERLOGIN,
    payload,
  };
}
export function actionGetFoods(payload) {
  return {
    type: FOODS,
    payload,
  };
}

export function getFoods(value, radioType) {
  return (dispatch) => {
    switch (radioType) {
    case 'ingredient':
      return MealServiceIngredientsAPI(value)
        .then((food) => dispatch(actionGetFoods(food)));
    case 'name':
      return MealServiceNameAPI(value)
        .then((food) => dispatch(actionGetFoods(food)));
    case 'letter':
      return MealServiceFirstLetterAPI(value)
        .then((food) => dispatch(actionGetFoods(food)));
    default: break;
    }
  };
}
