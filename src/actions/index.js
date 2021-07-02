export const REQUEST_INGREDIENT_FOOD = 'REQUEST_INGREDIENT_FOOD';
export const REQUEST_INGREDIENT_DRINK = 'REQUEST_INGREDIENT_DRINK';
// export const REQUEST_CATEGORIE_FOOD = 'REQUEST_CATEGORIE_FOOD';
export const REQUEST_CATEGORIE_DRINK = 'REQUEST_CATEGORIE_DRINK';
// export const REQUEST_FOOD = 'REQUEST_FOOD';
// export const REQUEST_DRINK = 'REQUEST_DRINK';

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

// export const fetchCategorieFood = async () => {
//   const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
//   const response = await result.json();
//   return response;
// };

// export const fetchCategorieFoodAction = () => async (dispatch) => {
//   let result = {};
//   result = await fetchCategorieFood();
//   dispatch({
//     type: REQUEST_CATEGORIE_FOOD,
//     payload: {
//       result,
//     },
//   });
// };

export const fetchCategorieDrink = async () => {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await result.json();
  return response;
};

export const fetchCategorieDrinkAction = () => async (dispatch) => {
  let result = {};
  result = await fetchCategorieDrink();
  dispatch({
    type: REQUEST_CATEGORIE_DRINK,
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

export const fetchCategorieDrinkFilter = async (categorie) => {
  const result = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`);
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
