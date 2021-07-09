export const REQUEST_INGREDIENT_FOOD = 'REQUEST_INGREDIENT_FOOD';
export const REQUEST_INGREDIENT_DRINK = 'REQUEST_INGREDIENT_DRINK';
export const REQUEST_FOOD_BY_ID = 'REQUEST_FOOD_BY_ID';
export const REQUEST_DRINK_BY_ID = 'REQUEST_DRINK_BY_ID';

export const fetchIngrediente = async (ingredient) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = await result.json();
  return response;
};

export const fetchName = async (name) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await result.json();
  return response;
};

export const fetchFirstLetter = async (primeiraLetra) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const response = await result.json();
  return response;
};

export const fetchIngrentAction = (searchInput, searchFilter) => async (dispatch) => {
  let result = {};
  if (searchFilter === 'ingrediente') {
    result = await fetchIngrediente(searchInput);
  } else if (searchFilter === 'nome') {
    result = await fetchName(searchInput);
  } else {
    result = await fetchFirstLetter(searchInput);
  }
  dispatch({
    type: REQUEST_INGREDIENT_FOOD,
    payload: {
      result,
    },
  });
};

export const fetchIngredienteDrink = async (ingredient) => {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = await result.json();
  return response;
};

export const fetchNameDrink = async (name) => {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await result.json();
  return response;
};

export const fetchFirstLetterDrink = async (primeiraLetra) => {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const response = await result.json();
  return response;
};

export const fetchDrinksAction = (searchInput, searchFilter) => async (dispatch) => {
  let result = {};
  if (searchFilter === 'ingrediente') {
    result = await fetchIngredienteDrink(searchInput);
  } else if (searchFilter === 'nome') {
    result = await fetchNameDrink(searchInput);
  } else {
    result = await fetchFirstLetterDrink(searchInput);
  }
  dispatch({
    type: REQUEST_INGREDIENT_DRINK,
    payload: {
      result,
    },
  });
};

export const fetchFood = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await result.json();
  return response;
};

export const fetchFoodAction = () => async (dispatch) => {
  let result = {};
  result = await fetchFood();
  dispatch({
    type: REQUEST_INGREDIENT_FOOD,
    payload: {
      result,
    },
  });
};

export const fetchDrink = async () => {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await result.json();
  return response;
};

export const fetchDrinkAction = () => async (dispatch) => {
  let result = {};
  result = await fetchDrink();
  dispatch({
    type: REQUEST_INGREDIENT_DRINK,
    payload: {
      result,
    },
  });
};

export const fetchCategorieFoodFilter = async (categorie) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
  const response = await result.json();
  return response;
};

export const fetchFoodId = async (id) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await result.json();
  return response;
};

export const fetchCategorieFoodFilterAction = (categorie) => async (dispatch) => {
  let result = {};
  result = await fetchCategorieFoodFilter(categorie);
  dispatch({
    type: REQUEST_INGREDIENT_FOOD,
    payload: {
      result,
    },
  });
};

export const fetchFoodIdAction = (id) => async (dispatch) => {
  const response = await fetchFoodId(id);
  dispatch({
    type: REQUEST_FOOD_BY_ID,
    payload: {
      response,
    },
  });
};

export const fetchCategorieDrinkFilter = async (categorie) => {
  const result = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`);
  const response = await result.json();
  return response;
};

export const fetchDrinkId = async (id) => {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await result.json();
  return response;
};

export const fetchCategorieDrinkFilterAction = (categorie) => async (dispatch) => {
  let result = {};
  result = await fetchCategorieDrinkFilter(categorie);
  dispatch({
    type: REQUEST_INGREDIENT_DRINK,
    payload: {
      result,
    },
  });
};

export const fetchDrinkIdAction = (id) => async (dispatch) => {
  const response = await fetchDrinkId(id);
  dispatch({
    type: REQUEST_DRINK_BY_ID,
    payload: {
      response,
    },
  });
};

export const fetchRandomFood = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const response = await result.json();
  return response;
};

export const fetchFoodRandom = () => async (dispatch) => {
  let result = {};
  result = await fetchRandomFood();
  dispatch({
    type: REQUEST_INGREDIENT_FOOD,
    payload: {
      result,
    },
  });
};

export const fetchRandomDrink = async () => {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const response = await result.json();
  return response;
};

export const fetchDrinkRandom = () => async (dispatch) => {
  let result = {};
  result = await fetchRandomDrink();
  dispatch({
    type: REQUEST_INGREDIENT_DRINK,
    payload: {
      result,
    },
  });
};
