// import { useContext } from 'react';
// import RecipeContext from '../context';

function createListIngredients(recipes) {
  // const { recipes } = useContext(RecipeContext);
  let ingredientsList = [];
  const ingredients = Object.entries(recipes[0]).filter(([key, value]) => (
    value && value !== ' ' && (
      key.includes('strIngredient') || key.includes('strMeasure'))));

  for (let i = 0; i < ingredients.length / 2; i += 1) {
    ingredientsList = [...ingredientsList,
      `${ingredients[i][1]} - ${ingredients[i + (ingredients.length / 2)][1]}`];
  }
  return ingredientsList;
}

export default createListIngredients;
