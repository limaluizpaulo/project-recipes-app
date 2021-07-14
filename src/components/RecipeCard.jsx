import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function RecipeCard(recipe, index) {
  const recipeID = recipe.idMeal
    ? `/comidas/${recipe.idMeal}` : `/bebidas/${recipe.idDrink}`;
  const recipeType = Object.keys(recipe)[0].includes('Meal') ? 'Meal' : 'Drink';
  return (
    <Link
      key={ index }
      data-testid={ `${index}-recipe-card` }
      style={ { color: 'inherit', textDecoration: 'inherit' } }
      to={ recipeID }
    >
      <Card style={ { width: '208px' } }>
        <Card.Img
          variant="top"
          src={ recipe[`str${recipeType}Thumb`] }
          alt={ recipe[`str${recipeType}`] }
          data-testid={ `${index}-card-img` }
        />
        <Card.Body>
          <Card.Text data-testid={ [`${index}-card-name`] }>
            {recipe[`str${recipeType}`]}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
