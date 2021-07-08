import { getAllFoodRecipes, isLoading, ERROR } from '../action';
import invokeAlert from '../helper/alertMsg';

const fetchFoodRecipesByArea = (country = '') => (dispatch) => {
  const maxRecipes = 12;
  dispatch(isLoading());
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals === null) {
        return invokeAlert(
          alert, ERROR,
        );
      }
      const recipes = data.meals.slice(0, maxRecipes);
      dispatch(getAllFoodRecipes(recipes));
    });
};

export default fetchFoodRecipesByArea;
