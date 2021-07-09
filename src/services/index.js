export async function getFoodCategories() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}

export async function getFoodRecipes() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}
export async function getRecipeByCategory(category) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}

export async function getDrinkCategories() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}

export async function getDrinkRecipes() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}

export async function getDrinkByCategory(category) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}

export async function getRecipeSearch(endpoint) {
  const result = await fetch(endpoint).then((data) => data.json());
  return result;
}

export async function getMealDetails(id) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}
export async function getDrinkDetails(id) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks || [{}];
}
export async function getRandomIdMeal() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals[0].idMeal;
}
export async function getIngredientsMealsList() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}
export async function getIngredientsDrinksList() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}
export async function getFilterIngredientListMeal(name) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}
export async function getFilterIngredientListDrink(name) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}
export async function getListArea() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}
export async function getMealByArea(name) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}
