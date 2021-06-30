const recipeEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinkEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const recipeCategoriesEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinkCategoriesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

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

export const fetchCatRecipes = async () => {
  const response = await fetch(recipeCategoriesEndPoint);
  const recipesCategories = response.json();
  return recipesCategories;
};

export const fetchCatDrinks = async () => {
  const response = await fetch(drinkCategoriesEndPoint);
  const drinksCategories = response.json();
  return drinksCategories;
};
