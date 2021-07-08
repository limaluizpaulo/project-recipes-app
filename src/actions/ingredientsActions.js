export const REQUEST_FOOD_INGREDIENTS = 'REQUEST_FOOD_INGREDIENTS';
export const REQUEST_DRINK_INGREDIENTS = 'REQUEST_DRINK_INGREDIENTS';

export const fetchFoodIngredients = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const response = await result.json();
  return response;
};

export const fetchFoodIngredientsAction = () => async (dispatch) => {
  let result = {};
  result = await fetchFoodIngredients();
  dispatch({
    type: REQUEST_FOOD_INGREDIENTS,
    payload: {
      result,
    },
  });
};

export const fetchDrinkIngredients = async () => {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const response = await result.json();
  return response;
};

export const fetchDrinkIngredientsAction = () => async (dispatch) => {
  let result = {};
  result = await fetchDrinkIngredients();
  dispatch({
    type: REQUEST_DRINK_INGREDIENTS,
    payload: {
      result,
    },
  });
};
