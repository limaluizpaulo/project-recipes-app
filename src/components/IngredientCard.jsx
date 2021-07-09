import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Context from '../context/Context';

export default function ItemCard({ item, i }) {
  const [str, setStr] = useState('');
  const [thumb, setThumb] = useState('');
  const history = useHistory();
  const { findMealsByFilter, findCocktailssByFilter } = useContext(Context);

  const { strIngredient, strIngredient1 } = item;

  useEffect(() => {
    if (!strIngredient) {
      setStr(strIngredient1);
      const url = `www.thecocktaildb.com/images/ingredients/${strIngredient1}.png`;
      setThumb(url);
    }
    if (!strIngredient1) {
      setStr(strIngredient);
      const url = `www.themealdb.com/images/ingredients/${strIngredient}.png`;
      setThumb(url);
    }
  }, [strIngredient, strIngredient1]);

  const filterByIngredient = () => {
    if (strIngredient) {
      findMealsByFilter({ searchText: str, filter: 'ingredient' });
      history.push('/comidas');
    }

    if (strIngredient1) {
      findCocktailssByFilter({ searchText: str, filter: 'ingredient' });
      history.push('/bebidas');
    }
  };

  return (
    <Card
      style={ { width: '18rem' } }
      data-testid={ `${i}-recipe-card` }
      onClick={ () => filterByIngredient() }
    >
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
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};
