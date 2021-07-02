import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ItemCard({ item, i }) {
  const [str, setStr] = useState('');
  const [thumb, setThumb] = useState('');

  const { strMeal, strMealThumb, strDrink, strDrinkThumb } = item;

  useEffect(() => {
    if (!strMeal && !strMealThumb) {
      setStr(strDrink);
      setThumb(strDrinkThumb);
    }
    if (!strDrink && !strDrinkThumb) {
      setStr(strMeal);
      setThumb(strMealThumb);
    }
  }, [str, strDrink, strDrinkThumb, strMeal, strMealThumb, thumb]);

  return (
    <Card style={ { width: '18rem' } } data-testid={ `${i}-recipe-card` }>
      <Card.Img variant="top" src={ thumb } data-testid={ `${i}-card-img` } />
      <Card.Body>
        <Card.Title data-testid={ `${i}-card-name` }>{ str }</Card.Title>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  i: PropTypes.number.isRequired,
  item: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};
