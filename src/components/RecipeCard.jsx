import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function RecipeCard(recipe, index) {
  const recipeID = recipe.idMeal
    ? `/comidas/${recipe.idMeal}` : `/bebidas/${recipe.idDrink}`;
  const recipeType = Object.keys(recipe)[0].includes('Meal') ? 'Meal' : 'Drink';
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <Link
        key={ index }
        style={ { color: 'inherit',
          textDecoration: 'inherit' } }
        to={ recipeID }
      >
        <Card>
          <Card.Img
            variant="top"
            src={ recipe[`str${recipeType}Thumb`] }
            alt={ recipe[`str${recipeType}`] }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Title data-testid={ [`${index}-card-name`] }>
              {recipe[`str${recipeType}`]}
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </section>
  );
}
