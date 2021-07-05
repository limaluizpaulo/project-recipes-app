import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Card({ mealOrDrink, index }) {
  const { path } = useRouteMatch();
  // const searchId = path === '/comidas' ? 'idMeal' : 'idDrink';
  const imgSrcKey = path === '/comidas' ? 'strMealThumb' : 'strDrinkThumb';
  const titleKey = path === '/comidas' ? 'strMeal' : 'strDrink';
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ mealOrDrink[`${imgSrcKey}`] }
        alt={ mealOrDrink[`${titleKey}`] }
      />
      <h3 data-testid={ `${index}-card-name` }>{mealOrDrink[`${titleKey}`]}</h3>
    </section>
  );
}

Card.propTypes = {
  mealOrDrink: PropTypes.shape(Object).isRequired,
  index: PropTypes.number.isRequired,
};
