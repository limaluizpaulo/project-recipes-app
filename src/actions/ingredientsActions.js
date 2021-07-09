export const REQUEST_FOOD_INGREDIENTS = 'REQUEST_FOOD_INGREDIENTS';
export const REQUEST_DRINK_INGREDIENTS = 'REQUEST_DRINK_INGREDIENTS';
export const REQUEST_FOOD_AREA = 'REQUEST_FOOD_AREA';
export const REQUEST_INGREDIENT_FOOD = 'REQUEST_INGREDIENT_FOOD';

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

export const fetchFoodArea = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const response = await result.json();
  return response;
};

export const fetchAreaAction = () => async (dispatch) => {
  let result = {};
  result = await fetchFoodArea();
  const meals = [{ strArea: 'All' }, ...result.meals];
  dispatch({
    type: REQUEST_FOOD_AREA,
    payload: {
      meals,
    },
  });
};

export const fetchRecipesFoodArea = async (area) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const response = await result.json();
  return response;
};

export const fetchRecipesFoodAreaAction = (area) => async (dispatch) => {
  let result = {};
  result = await fetchRecipesFoodArea(area);
  dispatch({
    type: REQUEST_INGREDIENT_FOOD,
    payload: {
      result,
    },
  });
};
