const possibleEndPoints = {
  comidas: {
    recipes: 'https://www.themealdb.com/api/json/v1/1/search.php?s',
    categories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',

    searchBarName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    searchBarFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    searchBarIngredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',

  },
  bebidas: {
    recipes: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    categories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',

    searchBarName: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    searchBarFirstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    searchBarIngredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
  },
};

const fetchInfo = (endpoint) => fetch(endpoint)
  .then((response) => (
    response
      .json()
      .then((json) => (response.ok
        ? Promise.resolve((json)) : Promise.reject(json)))
  ));

const conditionalEndpoint = (
  recipeType, fetchType, ingredient = '',
) => fetchInfo(`${possibleEndPoints[recipeType][fetchType]}${ingredient}`);

const fetchComidasEBebidas = (recipeType,
  fetchType, ingredient) => conditionalEndpoint(recipeType, fetchType, ingredient);

export default fetchComidasEBebidas;
