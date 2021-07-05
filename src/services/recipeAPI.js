const RECIPE_API_FOOD = 'https://www.themealdb.com/api/json/v1/1/';

const RECIPE_API_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

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

export default fetchRecipeFood;
