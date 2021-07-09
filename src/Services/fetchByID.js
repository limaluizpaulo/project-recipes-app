const fetchInfo = (endpoint) => fetch(endpoint)
  .then((response) => (
    response
      .json()
      .then((json) => (response.ok
        ? Promise.resolve((json)) : Promise.reject(json)))
  ));

const conditionalEndpoint = (recipeType, id) => {
  switch (recipeType) {
  case 'comidas':
    return fetchInfo(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  case 'bebidas':
    return fetchInfo(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  default:
    break;
  }
};

const fetchByID = (recipeType, id) => conditionalEndpoint(recipeType, id);

export default fetchByID;
