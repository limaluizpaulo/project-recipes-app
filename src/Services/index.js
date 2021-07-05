const conditionalEndpoint = (RECIPE_TYPE) => {
  switch (RECIPE_TYPE) {
  case 'comidas':
    return 'https://themealdb.com/api/json/v1/1/search.php?s';
  case 'bebidas':
    return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s';
  default:
    break;
  }
};

const fetchInfo = (endpoint) => fetch(endpoint)
  .then((response) => (
    response
      .json()
      .then((json) => (response.ok
        ? Promise.resolve(...Object.values(json)) : Promise.reject(json)))
  ));

const fetchBebidas = () => {
  const endpoint = conditionalEndpoint('bebidas');

  return fetchInfo(endpoint);
};

const fetchComidas = () => {
  const endpoint = conditionalEndpoint('comidas');

  return fetchInfo(endpoint);
};

const fetchComidasEBebidas = async () => {
  const bebidas = await fetchBebidas();
  const comidas = await fetchComidas();
  return { bebidas, comidas };
};

export default fetchComidasEBebidas;
