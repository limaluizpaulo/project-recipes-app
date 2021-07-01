import React from 'react';
import { Card } from 'react-bootstrap';

export default function Cocktail({ drinks: { strDrink, strDrinkThumb }, index }) {
  return (
    <Card style={ { width: '18rem' } } data-testid={ `${index}-recipe-card` }>
      <Card.Img variant="top" src={ strDrinkThumb } data-testid={ `${index}-card-img` } />
      <Card.Body>
        <Card.Title data-testid={ `${index}-card-name` }>{ strDrink }</Card.Title>
      </Card.Body>
    </Card>
  );
}
