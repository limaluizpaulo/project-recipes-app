const API_URL_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const API_URL_NAME_AND_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?';
const API_URL_ALL_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

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
