export const allRecipesUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  drinks: 'www.thecocktaildb.com/api/json/v1/1/search.php?s=',
};

export const searchRecipesUrls = {
  meals: {
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  },
  drinks: {
    ingredient: 'www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    name: 'www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'www.thecocktaildb.com/api/json/v1/1/search.php?f',
  },
};

export const randomRecipeUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/random.php',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
};

export const ingredientesRecipesUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
};
