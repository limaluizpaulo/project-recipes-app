import React from 'react';

export default function RecipeCard(recipe, index) {
  const recipeType = Object.keys(recipe)[0].includes('Meal') ? 'Meal' : 'Drink';
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe[`str${recipeType}Thumb`] }
        alt={ recipe[`str${recipeType}`] }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ [`${index}-card-name`] }>{recipe[`str${recipeType}`]}</p>
    </div>
  );
}
