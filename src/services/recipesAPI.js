import {
  allRecipesUrls,
  searchRecipesUrls,
  randomRecipeUrls,
  ingredientsUrls,
  areasUrl,
  recipesByArea,
  recipesById,
  categoriesUrls,
  searchByCategory,
} from './endpoints';

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

export const fetchIngredients = async (mealsOrDrinks) => {
  const request = await fetch(ingredientsUrls[mealsOrDrinks]);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};

export const fetchAreas = async () => {
  const request = await fetch(areasUrl);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};

export const fetchRecipesByArea = async (area) => {
  const endpoint = recipesByArea + area;
  const request = await fetch(endpoint);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};

export const fetchRecipesById = async (mealsOrDrinks, id) => {
  const request = await fetch(recipesById[mealsOrDrinks] + id);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};

export const fetchCategories = async (mealsOrDrinks) => {
  const request = await fetch(categoriesUrls[mealsOrDrinks]);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};

export const fetchRecipesByCategory = async (mealsOrDrinks, searchPayload) => {
  const request = await fetch(searchByCategory[mealsOrDrinks] + searchPayload);
  const response = await request.json();
  return request.ok ? Promise.resolve(response) : Promise.reject(response);
};
