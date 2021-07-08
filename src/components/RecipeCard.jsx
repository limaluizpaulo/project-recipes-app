import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard(recipe, index) {
  const recipeID = recipe.idMeal
    ? `/comidas/${recipe.idMeal}` : `/bebidas/${recipe.idDrink}`;
  const recipeType = Object.keys(recipe)[0].includes('Meal') ? 'Meal' : 'Drink';
  return (
    <Link key={ index } data-testid={ `${index}-recipe-card` } to={ recipeID }>
      <img
        src={ recipe[`str${recipeType}Thumb`] }
        alt={ recipe[`str${recipeType}`] }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ [`${index}-card-name`] }>{recipe[`str${recipeType}`]}</p>
    </Link>
  );
}
