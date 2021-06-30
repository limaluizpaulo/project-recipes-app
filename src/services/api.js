const recipeEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinkEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const fetchAllRecipes = async () => {
  const response = await fetch(recipeEndPoint);
  const recipes = response.json();
  return recipes;
};

export const fetchAllDrinks = async () => {
  const response = await fetch(drinkEndPoint);
  const drinks = response.json();
  return drinks;
};
