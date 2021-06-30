import getAPI from './api';

const COCKTAILS_API = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const getCocktailsCategories = () => (
  getAPI(`${COCKTAILS_API}list.php?`, 'c', 'drinks')
);

export const getCocktailsGlasses = () => (
  getAPI(`${COCKTAILS_API}list.php?`, 'g', 'drinks')
);

export const getCocktailsIngredients = () => (
  getAPI(`${COCKTAILS_API}list.php?`, 'i', 'drinks')
);

export const getCocktailsAlcoholicFilters = () => (
  getAPI(`${COCKTAILS_API}list.php?`, 'a', 'drinks')
);

// https://www.themealdb.com/api/json/v1/1/list.php?c=list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=
