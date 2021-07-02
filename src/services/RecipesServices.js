const API_URL_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const API_URL_NAME_AND_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?';
const API_URL_ALL_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_URL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const API_URL_RECIPES_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export async function fetchRecipesByIngredient(ingredient) {
  const request = await fetch(`${API_URL_INGREDIENT}${ingredient}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function fetchRecipesByName(name) {
  const request = await fetch(`${API_URL_NAME_AND_FIRST_LETTER}s=${name}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function fetchRecipesByFirstLetter(firstLetter) {
  const request = await fetch(`${API_URL_NAME_AND_FIRST_LETTER}f=${firstLetter}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function fetchAllRecipes() {
  const request = await fetch(API_URL_ALL_RECIPES);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function fetchCategoriesRecipes() {
  const request = await fetch(API_URL_CATEGORIES);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function fetchRecipesByCategory(category) {
  const request = await fetch(`${API_URL_RECIPES_BY_CATEGORY}${category}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}
