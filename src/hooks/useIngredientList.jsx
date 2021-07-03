import { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context/Context';
import { getFromLocalStorage, setRecipeInProgressLocalStorage } from '../services/helpers/localStorage';

const useIngredientList = () => {
  const [ingredients, setIngredients] = useState();
  const { selectedFood } = useContext(RecipeContext);
  const { idMeal, idDrink } = selectedFood;
  const CurrentId = idMeal || idDrink;
  const mainKey = idMeal ? 'meals' : 'cocktails';

  useEffect(() => {
    const inProgressRecipes = getFromLocalStorage('inProgressRecipes');
    const recipes = inProgressRecipes
    && inProgressRecipes[mainKey]
    && inProgressRecipes[mainKey][CurrentId];
    console.log(recipes);
    const createRecipe = () => {
      const keys = Object.keys(selectedFood);
      const mappedIngredients = {};
      keys.forEach((key) => {
        if (key.includes('Ingredient') && selectedFood[key]) {
          const isChecked = (recipes
            && recipes.some(({ ingr }) => ingr === selectedFood[key]));
          const number = key.split('Ingredient')[1];
          mappedIngredients[number] = { ingr: selectedFood[key], checked: !!isChecked };
        }
        if (key.includes('Measure') && selectedFood[key] && selectedFood[key] !== ' ') {
          const number = key.split('Measure')[1];
          mappedIngredients[number] = {
            ...mappedIngredients[number], meas: selectedFood[key],
          };
        }
      });
      setIngredients(mappedIngredients);
    };

    createRecipe();
  }, [selectedFood, mainKey, CurrentId]);

  const setIngredientInLocalStorage = (ingrLocation) => {
    setRecipeInProgressLocalStorage(mainKey, CurrentId, [ingredients[ingrLocation]]);
  };

  const checkIngredient = (ingrLocation) => {
    const ingredientsCopy = { ...ingredients };
    setIngredients(
      ingredientsCopy,
      ingredients[ingrLocation].checked = !ingredients[ingrLocation].checked,
    );
    setIngredientInLocalStorage(ingrLocation);
  };
  return {
    checkIngredient,
    ingredients,
  };
};

export default useIngredientList;
