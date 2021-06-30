export const USER_EMAIL = 'USER_EMAIL';
export const ALL_FOOD_CATEGORIES = 'ALL_FOOD_CATEGORIES';
export const ALL_DRINK_CATEGORIES = 'ALL_DRINK_CATEGORIES';
export const IS_LOADING = 'IS_LOADING';
export const IS_SEARCHBAR = 'IS_SEARCHBAR';

export const addEmail = (email) => ({ type: USER_EMAIL, email });
export const isLoading = () => ({ type: IS_LOADING });
export const getAllFoodCategories = (allFoodCategories) => ({
  type: ALL_FOOD_CATEGORIES, allFoodCategories });
export const getAllDrinkCategories = (allDrinkCategories) => ({
  type: ALL_DRINK_CATEGORIES, allDrinkCategories });
export const getSearchBarResponse = (searchBarOn) => ({
  type: IS_SEARCHBAR, searchBarOn });

export const fetchApiFoodCategories = () => (dispatch) => {
  dispatch(isLoading());
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((allFoodCategories) => dispatch(getAllFoodCategories(allFoodCategories)));
};

export const fetchApiDrinkCategories = () => (dispatch) => {
  dispatch(isLoading());
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((allDrinkCategories) => dispatch(getAllDrinkCategories(allDrinkCategories)));
};
