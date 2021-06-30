const URL_RECIPES = 'www.themealdb.com/api/json/v1/1/search.php?s';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s';

export const getRecipes = async () => {
  const result = await fetch(URL_RECIPES);
  const data = await result.json();
  console.log(data);
  return data.drinks;
};

export const getDrinks = async () => {
  const result = await fetch(URL_DRINKS);
  const data = await result.json();
  console.log(data);
  return data.drinks;
};
