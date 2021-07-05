export const fetchRecipesList = async () => {
  const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  const response = await meals.json();
  const data = response.meals
  return data;
}

export const fetchDrinksList = async () => {
  const drinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
  const response = await drinks.json();
  const data = response.drinks
  return data;
}