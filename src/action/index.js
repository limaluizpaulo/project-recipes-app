export const USER_EMAIL = 'USER_EMAIL';
export const ALL_FOOD_CATEGORIES = 'ALL_FOOD_CATEGORIES';
export const ALL_DRINK_CATEGORIES = 'ALL_DRINK_CATEGORIES';
export const IS_LOADING = 'IS_LOADING';
<<<<<<< HEAD
export const IS_SEARCHBAR = 'IS_SEARCHBAR';
=======
export const ALL_FOOD_RECIPES = 'ALL_FOOD_RECIPES';
>>>>>>> d061ba01f296128333036b57914a186a2a03daa8

export const addEmail = (email) => ({ type: USER_EMAIL, email });
export const isLoading = () => ({ type: IS_LOADING });
export const getAllFoodCategories = (allFoodCategories) => ({
  type: ALL_FOOD_CATEGORIES, allFoodCategories });
export const getAllDrinkCategories = (allDrinkCategories) => ({
  type: ALL_DRINK_CATEGORIES, allDrinkCategories });
<<<<<<< HEAD
export const getSearchBarResponse = (searchBarOn) => ({
  type: IS_SEARCHBAR, searchBarOn });
=======
export const getAllFoodRecipes = (recipes) => ({
  type: ALL_FOOD_RECIPES, recipes });
>>>>>>> d061ba01f296128333036b57914a186a2a03daa8

export const fetchApiFoodCategories = () => (dispatch) => {
  dispatch(isLoading());
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((allFoodCategories) => {
      const maxCategories = 5;
      const categories = allFoodCategories.categories.slice(0, maxCategories);
      dispatch(getAllFoodCategories(categories));
    });
};

export const fetchApiDrinkCategories = () => (dispatch) => {
  dispatch(isLoading());
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((allDrinkCategories) => dispatch(getAllDrinkCategories(allDrinkCategories)));
};

export const fetchFoodRecipes = () => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((allFoodRecipes) => {
      const recipes = allFoodRecipes.meals.slice(0, maxRecipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};
