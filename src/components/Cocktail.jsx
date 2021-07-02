import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function Cocktail(drink, index) {
  const { strDrink, strDrinkThumb } = drink;
  return (
    <Card style={ { width: '18rem' } } data-testid={ `${index}-recipe-card` }>
      <Card.Img variant="top" src={ strDrinkThumb } data-testid={ `${index}-card-img` } />
      <Card.Body>
        <Card.Title data-testid={ `${index}-card-name` }>{ strDrink }</Card.Title>
      </Card.Body>
    </Card>
  );
}

Cocktail.porpType = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }),
};
