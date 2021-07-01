import {
  allRecipesUrls,
  searchRecipesUrls,
  randomRecipeUrls,
  ingredientesRecipesUrls,
} from './APIEndpoints';

export const fetchAllRecipes = async (mealsOrDrinks) => {
  const request = await fetch(allRecipesUrls[mealsOrDrinks]);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};

export const fetchRecipesBySearch = async (
  mealsOrDrinks, searchParameter, searchPayload,
) => {
  const endpoint = searchRecipesUrls[mealsOrDrinks][searchParameter] + searchPayload;
  const request = await fetch(endpoint);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};

export const fetchRandomRecipe = async (mealsOrDrinks) => {
  const request = await fetch(randomRecipeUrls[mealsOrDrinks]);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};

export const fetchIngredientesRecipes = async (mealsOrDrinks) => {
  const request = await fetch(ingredientesRecipesUrls[mealsOrDrinks]);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};
