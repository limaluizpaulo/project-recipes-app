import getAPI from './api';

const COCKTAILS_API = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const getCocktailsRecipes = () => (
  getAPI(COCKTAILS_API, 'search.php?s=', 'drinks')
);

export const getCocktailsCategories = () => (
  getAPI(COCKTAILS_API, 'list.php?c=list', 'drinks')
);
export const getCocktailsAreas = () => (
  getAPI(COCKTAILS_API, 'list.php?a=list', 'drinks')
);
export const getCocktailsIngredients = () => (
  getAPI(COCKTAILS_API, 'list.php?i=list', 'drinks')
);
export const getCocktailsIngredientsFilter = (filter) => (
  getAPI(COCKTAILS_API, 'filter.php?i=', 'drinks', filter)
);
export const getCocktailsByCategory = (category) => (
  getAPI(COCKTAILS_API, 'filter.php?c=', 'drinks', category)
);
