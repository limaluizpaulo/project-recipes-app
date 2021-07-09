const fetchInfo = (endpoint) => fetch(endpoint)
  .then((response) => (
    response
      .json()
      .then((json) => (response.ok
        ? Promise.resolve((json)) : Promise.reject(json)))
  ));

const conditionalEndpoint = (recipeType) => {
  switch (recipeType) {
  case 'comidas':
    return fetchInfo('https://www.themealdb.com/api/json/v1/1/search.php?s');
  case 'bebidas':
    return fetchInfo('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  default:
    break;
  }
};

const conditionalEndpointRandom = (recipeType) => {
  switch (recipeType) {
  case 'comidas':
    return fetchInfo('https://www.themealdb.com/api/json/v1/1/random.php');
  case 'bebidas':
    return fetchInfo('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  default:
    break;
  }
};

export const fetchComidasEBebidas = (recipeType) => conditionalEndpoint(recipeType);
export const fetchRandomRecipe = (recipeType) => conditionalEndpointRandom(recipeType);
