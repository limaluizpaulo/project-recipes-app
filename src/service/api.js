const BASE_URL_SEARCH_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_SEARCH_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';
const BASE_URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const BASE_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const BASE_URL_CATEGORIES_MEAL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const BASE_URL_CATEGORIES_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const BASE_URL_FILTER_CTGORY_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const BASE_URL_FILTER_CTGORY_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const BASE_URL_DETAIL_MEAL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const BASE_URL_DETAIL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const BASE_URL_RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const BASE_URL_RANDOM_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const BASE_URL_MEAL_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const BASE_URL_DRINK_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export async function recipesListApi(pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(BASE_URL_MEAL);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(BASE_URL_DRINKS);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}

export async function recipesListRecomendationApi(pathname) {
  let fetchSearch;
  if (pathname.includes('/comidas')) {
    fetchSearch = await fetch(BASE_URL_DRINKS);
    const response = await fetchSearch.json();
    return response.drinks;
  }
  if (pathname.includes('/bebidas')) {
    fetchSearch = await fetch(BASE_URL_MEAL);
    const response = await fetchSearch.json();
    return response.meals;
  }
}

export async function categoriesListApi(pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(BASE_URL_CATEGORIES_MEAL);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(BASE_URL_CATEGORIES_DRINKS);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}

export async function filterCategoryApi(selectedCategory, pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(`${BASE_URL_FILTER_CTGORY_MEAL}${selectedCategory}`);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(`${BASE_URL_FILTER_CTGORY_DRINKS}${selectedCategory}`);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}

export async function searchByIngredientsApi(inputValue, pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_MEAL}filter.php?i=${inputValue}`);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_DRINKS}filter.php?i=${inputValue}`);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}

export async function searchByNameApi(inputValue, pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_MEAL}search.php?s=${inputValue}`);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_DRINKS}search.php?s=${inputValue}`);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}

export async function searchByFirstLetterApi(inputValue, pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_MEAL}search.php?f=${inputValue}`);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_DRINKS}search.php?f=${inputValue}`);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}

export async function detailRecipeDrinks(id) {
  if (id) {
    const fetchSearch = await fetch(`${BASE_URL_DETAIL_DRINKS}${id}`);
    const response = await fetchSearch.json();
    return response.drinks;
  }
  return [];
}

export async function detailRecipeMeal(id) {
  const fetchSearch = await fetch(`${BASE_URL_DETAIL_MEAL}${id}`);
  const response = await fetchSearch.json();
  return response.meals;
}

export async function randomRecipe(pathname) {
  let fetchSearch;
  if (pathname.match(/comidas/)) {
    fetchSearch = await fetch(BASE_URL_RANDOM_MEAL);
    const response = await fetchSearch.json();
    return response.meals[0].idMeal;
  }
  if (pathname.match(/bebidas/)) {
    fetchSearch = await fetch(BASE_URL_RANDOM_DRINKS);
    const response = await fetchSearch.json();
    return response.drinks[0].idDrink;
  }
}

export async function searchIngredients(pathname) {
  const MAX_NUMBER_OF_ITEMS = 12;
  let fetchSearch;
  if (pathname.match(/comidas/)) {
    fetchSearch = await fetch(BASE_URL_MEAL_INGREDIENTS);
    const response = await fetchSearch.json();
    response.meals.splice(MAX_NUMBER_OF_ITEMS);
    const ingredientsImages = response.meals.map((ingredient) => {
      const imgSrc = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`;
      return { ...ingredient, imgSrc };
    });
    return ingredientsImages;
  }
  if (pathname.match(/bebidas/)) {
    fetchSearch = await fetch(BASE_URL_DRINK_INGREDIENTS);
    const response = await fetchSearch.json();
    response.drinks.splice(MAX_NUMBER_OF_ITEMS);
    const ingredientsImages = response.drinks.map((ingredient) => {
      const imgSrc = `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
      return { ...ingredient, imgSrc };
    });
    return ingredientsImages;
  }
}
