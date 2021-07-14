export const fetchRecipesList = async () => {
  const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await meals.json();
  const data = response.meals;
  return data;
};

export const fetchAreaOrigens = async () => {
  const origins = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const response = await origins.json();
  const data = response.meals;
  return data;
};

export const fetchArea = async (area) => {
  const countries = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const response = await countries.json();
  const data = response.meals;
  return data;
};

export const fetchDrinksList = async () => {
  const drinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await drinks.json();
  const data = response.drinks;
  return data;
};

export const categoryListMeal = async () => {
  const meals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await meals.json();
  const data = response.meals;
  return data;
};

export const categoryListDrink = async () => {
  const drinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await drinks.json();
  const data = response.drinks;
  return data;
};

export const filterCategoryMeals = async (category) => {
  const fetchByCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await fetchByCategory.json();
  const data = response.meals;
  return data;
};

export const filterCategoryDrinks = async (category) => {
  const fetchByCategory = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await fetchByCategory.json();
  const data = response.drinks;
  return data;
};

export const filterMealsById = async (id) => {
  const fetchById = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await fetchById.json();
  const data = response.meals;
  return data;
};

export const filterDrinksById = async (id) => {
  const fetchById = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await fetchById.json();
  const data = response.drinks;
  return data;
};

export const fetchMealsRandom = async () => {
  const fetchMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const response = await fetchMeal.json();
  const data = response.meals;
  return data[0].idMeal;
};

export const fetchDrinksRandom = async () => {
  const fetchDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const response = await fetchDrink.json();
  const data = response.drinks;
  return data[0].idDrink;
};
