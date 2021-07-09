export const allRecipesUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
};

export const searchRecipesUrls = {
  meals: {
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  },
  drinks: {
    ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
  },
};

export const searchRecipesById = {
  meals: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
};

export const randomRecipeUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/random.php',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
};

export const ingredientsUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
};

export const areasUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export const recipesByArea = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const categoriesUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
};

export const searchByCategory = {
  meals: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
};
