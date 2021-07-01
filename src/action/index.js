export const USER_EMAIL = 'USER_EMAIL';
export const ALL_FOOD_CATEGORIES = 'ALL_FOOD_CATEGORIES';
export const ALL_DRINK_CATEGORIES = 'ALL_DRINK_CATEGORIES';
export const IS_LOADING = 'IS_LOADING';
export const IS_SEARCHBAR = 'IS_SEARCHBAR';
export const ALL_FOOD_RECIPES = 'ALL_FOOD_RECIPES';
export const ALL_DRINKS_RECIPES = 'ALL_DRINKS_RECIPES';

export const addEmail = (email) => ({ type: USER_EMAIL, email });
export const isLoading = () => ({ type: IS_LOADING });
export const getAllFoodCategories = (allFoodCategories) => ({
  type: ALL_FOOD_CATEGORIES, allFoodCategories });
export const getAllDrinkCategories = (allDrinkCategories) => ({
  type: ALL_DRINK_CATEGORIES, allDrinkCategories });
export const getSearchBarResponse = (searchBarOn) => ({
  type: IS_SEARCHBAR, searchBarOn });
export const getAllFoodRecipes = (recipes) => ({
  type: ALL_FOOD_RECIPES, recipes });
export const getAllDrinksRecipes = (recipes) => ({
  type: ALL_DRINKS_RECIPES, recipes });

export const fetchApiFoodCategories = () => (dispatch) => {
  dispatch(isLoading());
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((allFoodCategories) => {
      const maxCategories = 5;
      const categories = allFoodCategories.meals.slice(0, maxCategories);
      dispatch(getAllFoodCategories(categories));
    });
};

export const fetchApiDrinkCategories = () => (dispatch) => {
  dispatch(isLoading());
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((allDrinkCategories) => {
      const maxCategories = 5;
      const categories = allDrinkCategories.drinks.slice(0, maxCategories);
      dispatch(getAllDrinkCategories(categories));
    });
};

export const fetchFoodRecipes = (name = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((allFoodRecipes) => {
      const recipes = allFoodRecipes.meals.slice(0, maxRecipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};

export const fetchFoodRecipesByIngredients = (ingrediente = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json())
    .then((allFoodRecipes) => {
      console.log(allFoodRecipes);
      const recipes = allFoodRecipes.meals.slice(0, maxRecipes);
      console.log(recipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};
export const fetchFoodRecipesByfirstLetter = (primeiraletra = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraletra}`)
    .then((response) => response.json())
    .then((allFoodRecipes) => {
      const recipes = allFoodRecipes.meals.slice(0, maxRecipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};

export const fetchDrinksRecipes = (name = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((allDrinksRecipes) => {
      const drinksRecipes = allDrinksRecipes.drinks.slice(0, maxRecipes);
      console.log(drinksRecipes);
      dispatch(getAllDrinksRecipes(drinksRecipes));
    });
};

export const fetchDrinksRecipesByFirstLetter = (letter = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((response) => response.json())
    .then((allDrinksRecipesByFirsLetter) => {
      const drinksRecipes = allDrinksRecipesByFirsLetter.drinks.slice(0, maxRecipes);
      console.log(drinksRecipes);
      dispatch(getAllDrinksRecipes(drinksRecipes));
    });
};
