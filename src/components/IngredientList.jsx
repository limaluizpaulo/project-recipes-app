import React, { useContext, useState, useEffect } from 'react';

import RecipeContext from '../context/Context';

const IngredientList = () => {
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

  const renderList = () => {
    const keys = Object.keys(ingredients);
    return keys.map((key, index) => {
      const { ingr, meas } = ingredients[key];
      return (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          -
          {' '}
          {ingr}
          {' '}
          -
          {meas}
        </li>);
    });
  };
  if (ingredients) {
    return (
      <ul>
        {renderList()}
      </ul>
    );
  }
  return <p>Loading</p>;
};

export default IngredientList;
