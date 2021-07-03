import { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context/Context';

const useIngredientList = () => {
  const [ingredients, setIngredients] = useState();
  const { selectedFood } = useContext(RecipeContext);

  useEffect(() => {
    const createRecipe = () => {
      const keys = Object.keys(selectedFood);
      const mappedIngredients = {};
      keys.forEach((key) => {
        if (key.includes('Ingredient') && selectedFood[key]) {
          const number = key.split('Ingredient')[1];
          mappedIngredients[number] = { ingr: selectedFood[key] };
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
  }, [selectedFood]);
  return {
    ingredients,
  };
};

export default useIngredientList;
