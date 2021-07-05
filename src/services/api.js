const URL_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s';
const LENGTH_DOZE = 12;

export const getRecipes = async () => {
  const result = await fetch(URL_RECIPES);
  const { meals } = await result.json();
  console.log(meals);
  return meals.slice(0, LENGTH_DOZE);
};

export const getDrinks = async () => {
  const result = await fetch(URL_DRINKS);
  const { drinks } = await result.json();
  console.log(drinks);
  return drinks.slice(0, LENGTH_DOZE);
};
