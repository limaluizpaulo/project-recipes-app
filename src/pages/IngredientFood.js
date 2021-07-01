import React from 'react';
import IngredientsRacipesAPI from '../services/IngredientsRacipesAPI';

function IngredientFood() {
  const imgUrl = 'https://www.themealdb.com/images/ingredients/';
  return (
    <div>
      IngredientFood
      <img src={ `${imgUrl}/Chicken.png` } alt="Chicken" />
    </div>
  );
}

export default IngredientFood;
