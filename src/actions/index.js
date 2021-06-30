export const REQUEST_INGREDIENT = 'REQUEST_INGREDIENT';

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
    type: REQUEST_INGREDIENT,
    payload: {
      result,
    },
  });
};
