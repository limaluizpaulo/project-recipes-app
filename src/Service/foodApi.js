export const fetchTypeCotegoryMeals = async (category) => {
  const categoryMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const { meals } = await categoryMeals.json();
  return meals;
};

export const fetchAllMeals = async () => {
  const allMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await allMeals.json();
  return meals;
};

export const fetchIngredientesMeal = async (ingrediente) => {
  const ingredientes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const { meals } = await ingredientes.json();
  return meals;
};

export const fetchNomeMeal = async (nome) => {
  const nomeAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const { meals } = await nomeAPI.json();
  return meals;
};

export const fetchFirstLetterMeal = async (first) => {
  const firstLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${first}`);
  const { meals } = await firstLetter.json();
  return meals;
};

export const fetchMealsCategory = async () => {
  const categoryMeals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await categoryMeals.json();
  return meals;
};

export const fetchRandomMeal = async () => {
  const randomMeal = await
  fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const { meals } = await randomMeal.json();
  return meals;
};

export const fetchMealsIngredients = async () => {
  const allIngredients = await
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const { Ingredients } = await allIngredients.json();
  return Ingredients;
};