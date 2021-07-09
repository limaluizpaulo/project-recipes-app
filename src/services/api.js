const URL_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
const URL_SEARCH_MEALS = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_SEARCH_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';
const URL_INGREDIENTS_RECIPES = 'www.themealdb.com/api/json/v1/1/list.php?i=list';
const LENGTH_DOZE = 12;
const LENGTH_CINCO = 5;
const messageAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

// -------------------------RECIPES--------------------------------

export const getRecipes = async () => {
  try {
    const result = await fetch(URL_RECIPES);
    const { meals } = await result.json();
    return meals.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getRecipesByIngredients = async (ingredient) => {
  try {
    const result = await fetch(`${URL_SEARCH_MEALS}filter.php?i=${ingredient}`);
    const { meals } = await result.json();
    console.log(meals);
    return meals.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getRecipesByName = async (name) => {
  try {
    const result = await fetch(`${URL_RECIPES}=${name}`);
    const { meals } = await result.json();
    return meals.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

// export const getRecipesByLocation = async (location) => {
// const result = await fetch(`${URL_SEARCH_MEALS_LOCATION=${location}`);
// const { meals } = await result.json();
// return meals.slice(0, LENGTH_DOZE);
// };

export const getRecipesByFirstLetter = async (firstLetter) => {
  try {
    const result = await fetch(`${URL_SEARCH_MEALS}search.php?f=${firstLetter}`);
    const { meals } = await result.json();
    return meals.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getCategoriesRecipes = async () => {
  try {
    const result = await fetch(`${URL_SEARCH_MEALS}list.php?c=list`);
    const { meals } = await result.json();
    return meals.slice(0, LENGTH_CINCO);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getRecipesByCategories = async (category) => {
  try {
    const result = await fetch(`${URL_SEARCH_MEALS}filter.php?c=${category}`);
    const { meals } = await result.json();
    console.log(meals);
    return meals.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getIngredientsRecipes = async () => {
  const result = await fetch(URL_INGREDIENTS_RECIPES);
  const { meals } = await result.json();
  console.log(meals);
  return meals.slice(0, LENGTH_DOZE);
};

// ---------------------DRINKS-----------------------------------------------------------

export const getDrinks = async () => {
  try {
    const result = await fetch(URL_DRINKS);
    const { drinks } = await result.json();
    return drinks.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getDrinksByIngredients = async (ingredient) => {
  try {
    const result = await fetch(`${URL_SEARCH_DRINKS}filter.php?i=${ingredient}`);
    const { drinks } = await result.json();
    return drinks.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getDrinksByName = async (name) => {
  try {
    const result = await fetch(`${URL_DRINKS}${name}`);
    const { drinks } = await result.json();
    return drinks.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getDrinksByFirstLetter = async (firstLetter) => {
  try {
    const result = await fetch(`${URL_SEARCH_DRINKS}search.php?f=${firstLetter}`);
    const { drinks } = await result.json();
    return drinks.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getCategoriesDrinks = async () => {
  try {
    const result = await fetch(`${URL_SEARCH_DRINKS}list.php?c=list`);
    const { drinks } = await result.json();
    return drinks.slice(0, LENGTH_CINCO);
  } catch (_error) {
    global.alert(messageAlert);
  }
};

export const getDrinksByCategories = async (category) => {
  try {
    const result = await fetch(`${URL_SEARCH_DRINKS}filter.php?c=${category}`);
    const { drinks } = await result.json();
    return drinks.slice(0, LENGTH_DOZE);
  } catch (_error) {
    global.alert(messageAlert);
  }
};
