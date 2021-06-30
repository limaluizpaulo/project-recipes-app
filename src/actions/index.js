export const REQUEST_INGREDIENT_FOOD = 'REQUEST_INGREDIENT_FOOD';
export const REQUEST_INGREDIENT_DRINK = 'REQUEST_INGREDIENT_DRINK';

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
  console.log('COMIDA');
  console.log(result);
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
  console.log('Bebida');
  console.log(result);
  dispatch({
    type: REQUEST_INGREDIENT_DRINK,
    payload: {
      result,
    },
  });
};
