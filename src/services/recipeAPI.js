const RECIPE_API_FOOD = 'https://www.themealdb.com/api/json/v1/1/';

const RECIPE_API_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

const RECIPE_API_ALL_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const RECIPE_API_ALL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const RECIPE_CATEGORY_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const RECIPE_CATEGORY_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const RECIPE_API_FILTER_FOOD = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

const RECIPE_API_FILTER_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const fetchRecipeFood = (type) => (
  fetch(`${RECIPE_API_FOOD}${type}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const fetchRecipeDrink = (type) => (
  fetch(`${RECIPE_API_DRINK}${type}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const fetchRecipeAllFood = () => (
  fetch(RECIPE_API_ALL_FOOD)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const fetchRecipeAllDrink = () => (
  fetch(RECIPE_API_ALL_DRINK)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const fetchCategoryDrinks = () => (
  fetch(RECIPE_CATEGORY_DRINK)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const fetchCategoryFood = () => (
  fetch(RECIPE_CATEGORY_FOOD)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const fetchRecipeFilterFood = (name) => (
  fetch(`${RECIPE_API_FILTER_FOOD}${name}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);

export const fetchRecipeFilterDrinks = (name) => (
  fetch(`${RECIPE_API_FILTER_DRINKS}${name}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error))
);
export default fetchRecipeFood;
