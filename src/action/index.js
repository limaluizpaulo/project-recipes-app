import invokeAlert from '../helper/alertMsg';
// import foodData from '../help/foodData';

const RESPONSE_ERROR = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

export const USER_EMAIL = 'USER_EMAIL';
export const ALL_FOOD_CATEGORIES = 'ALL_FOOD_CATEGORIES';
export const ALL_DRINK_CATEGORIES = 'ALL_DRINK_CATEGORIES';
export const IS_LOADING = 'IS_LOADING';
export const RAMDOM_RECIPE = 'RAMDOM_RECIPE';
export const IS_SEARCHBAR = 'IS_SEARCHBAR';
export const ALL_FOOD_RECIPES = 'ALL_FOOD_RECIPES';
export const FOOD_BY_CATEGORIES = 'FOOD_BY_CATEGORIES';
export const ALL_DRINKS_RECIPES = 'ALL_DRINKS_RECIPES';
export const DRINK_BY_CATEGORIES = 'DRINK_BY_CATEGORIES';
export const RECIPE_DETAILS_FOOD = 'RECIPE_DETAILS_FOOD';
export const RECIPE_DETAILS_DRINK = 'RECIPE_DETAILS_DRINK';
export const FAV_ICON = 'FAV_ICON';
export const FAV_ICON_COLOR = 'FAV_ICON_COLOR';
export const START_RECIPE = 'START_RECIPE';
export const CHECK_PAGE = 'CHECK_PAGE';

export const addFavicon = (favIcon) => ({ type: FAV_ICON, favIcon });
export const faviconColor = (color) => ({ type: FAV_ICON_COLOR, color });
export const addEmail = (email) => ({ type: USER_EMAIL, email });
export const isLoading = () => ({ type: IS_LOADING });
export const getAllFoodCategories = (allFoodCategories) => ({
  type: ALL_FOOD_CATEGORIES, allFoodCategories });
export const getAllDrinkCategories = (allDrinkCategories) => ({
  type: ALL_DRINK_CATEGORIES, allDrinkCategories });
export const getSearchBarResponse = (searchBarOn) => ({
  type: IS_SEARCHBAR, searchBarOn });
export const getRamdomRecipe = (ramdomRecipe) => ({
  type: RAMDOM_RECIPE, ramdomRecipe });
export const getAllFoodRecipes = (recipes) => ({
  type: ALL_FOOD_RECIPES, recipes });
export const getFoodByCategories = (meals) => ({
  type: FOOD_BY_CATEGORIES, meals });
export const getFoodDetails = (mealsDetails) => ({
  type: RECIPE_DETAILS_FOOD, mealsDetails });
export const getDrinkDetails = (drinksDetails) => ({
  type: RECIPE_DETAILS_DRINK, drinksDetails });
export const getDrinkByCategories = (drinks) => ({
  type: DRINK_BY_CATEGORIES, drinks });
export const getAllDrinksRecipes = (recipes) => ({
  type: ALL_DRINKS_RECIPES, recipes });
export const startRecipe = () => ({
  type: START_RECIPE, isStart: true });
export const checkPage = () => ({
  type: CHECK_PAGE, isDrink: true });

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
  dispatch(isLoading());
  const maxRecipes = 12;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((allFood) => {
      if (allFood.meals === null) {
        return invokeAlert(
          alert, RESPONSE_ERROR,
        );
      }
      const recipes = allFood.meals.slice(0, maxRecipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};

export const fetchFilterFoodByCategories = (category) => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((foodCategories) => {
      const recipes = foodCategories.meals.slice(0, maxRecipes);
      dispatch(getFoodByCategories(recipes));
    });
};

export const fetchFilterDrinkByCategories = (category) => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((drinkCategories) => {
      const drinks = drinkCategories.drinks.slice(0, maxRecipes);
      dispatch(getDrinkByCategories(drinks));
    });
};

export const fetchFoodRecipesByIngredients = (ingrediente = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json())
    .then((allFoodRecipes) => {
      if (allFoodRecipes.meals === null) {
        return invokeAlert(
          alert, RESPONSE_ERROR,
        );
      }
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
      if (allFoodRecipes.meals === null) {
        return invokeAlert(
          alert, RESPONSE_ERROR,
        );
      }
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
      if (allDrinksRecipes.drinks === null) {
        return invokeAlert(
          alert, RESPONSE_ERROR,
        );
      }
      const drinksRecipes = allDrinksRecipes.drinks.slice(0, maxRecipes);
      dispatch(getAllDrinksRecipes(drinksRecipes));
    });
};

export const fetchDrinksRecipesByIngredient = (ingrediente = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json())
    .then((allDrinksRecipes) => {
      if (allDrinksRecipes.drinks === null) {
        return invokeAlert(
          alert, RESPONSE_ERROR,
        );
      }
      const drinks = allDrinksRecipes.drinks.slice(0, maxRecipes);
      dispatch(getAllDrinksRecipes(drinks));
    });
};

export const fetchDrinksRecipesByFirstLetter = (letter = 'a') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((response) => response.json())
    .then((allDrinksRecipesByFirsLetter) => {
      if (allDrinksRecipesByFirsLetter.drinks === null) {
        return invokeAlert(
          alert, RESPONSE_ERROR,
        );
      }
      const drinksRecipes = allDrinksRecipesByFirsLetter.drinks.slice(0, maxRecipes);
      dispatch(getAllDrinksRecipes(drinksRecipes));
    });
};

export const fetchRamdomRecipe = (param = 'mealdb', param2 = 'meals') => (dispatch) => {
  dispatch(isLoading());

  fetch(`https://www.the${param}.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((ramdomRecipeData) => {
      // const ramdomRecipe = ramdomRecipeData;
      // console.log(ramdomRecipeData[param2][0]);
      console.log(param2);
      console.log(ramdomRecipeData);
      console.log(ramdomRecipeData[param2]);
      dispatch(getFoodDetails(ramdomRecipeData[param2][0]));
    });
};

export const fetchFoodDetails = (id) => (dispatch) => {
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((foodDetails) => {
      dispatch(getFoodDetails(foodDetails.meals[0]));
    });
};

export const fetchDrinkDetails = (id) => (dispatch) => {
  dispatch(isLoading());
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((drinkDetails) => {
      dispatch(getDrinkDetails(drinkDetails.drinks[0]));
      dispatch(checkPage());
    });
};
