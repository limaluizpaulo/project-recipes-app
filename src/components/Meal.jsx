import React from 'react';
import { Card } from 'react-bootstrap';

export default function Meal({ meal: { strMeal, strMealThumb }, index }) {
  return (
    <Card style={ { width: '18rem' } } data-testid={ `${index}-recipe-card` }>
      <Card.Img variant="top" src={ strMealThumb } data-testid={ `${index}-card-img` } />
      <Card.Body>
        <Card.Title data-testid={ `${index}-card-name` }>{ strMeal }</Card.Title>
      </Card.Body>
    </Card>
  );
}
