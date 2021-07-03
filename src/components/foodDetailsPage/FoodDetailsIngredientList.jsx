import React, { useContext } from 'react';
import RecipeContext from '../../context/Context';

import useIngredientList from '../../hooks/useIngredientList';

const FoodDetailsIngredientList = () => {
  const { ingredients } = useContext(RecipeContext);
  useIngredientList();
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

export default FoodDetailsIngredientList;
