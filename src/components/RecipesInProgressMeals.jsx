import React, { useState, useContext } from 'react';

import RecipesContext from '../Context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function RecipesInProgress() {
  const { stateMeals, measureMeals, ingredientsMeals } = useContext(RecipesContext);
  const { strMeal, strMealThumb, strCategory, strInstructions } = stateMeals[0];

  return (
    <main>
      <img
        src={ strMealThumb }
        alt={ `Imagem ${strMeal}` }
        width="60px"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <ShareButton />
      <FavoriteButton />
      <h3>{strCategory}</h3>
      <h2>Ingredients</h2>
      <ul>
        {console.log(ingredientsMeals)}
        {ingredientsMeals.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { `${ingredient} ${measureMeals[index] !== undefined
              ? `-${measureMeals[index]}` : ''}`}
            <input type="checkbox" onChange />
          </li>
        ))}
      </ul>
      <div>
        <h4>Mode de Preparo</h4>
        <p>{strInstructions}</p>
      </div>
    </main>
  );
}
