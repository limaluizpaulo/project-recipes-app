import React from 'react';
import PropTypes from 'prop-types';

const DrinkCard = ({ recipe: { strDrinkThumb, strDrink }, index }) => (
  <div data-testid={ `${index}-recipe-card` }>
    <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt={ strDrink } />
    <p data-testid={ `${index}-card-name` }>{strDrink}</p>
  </div>
);

DrinkCard.defaultProps = {
  strDrinkThumb: '',
  strDrink: '',
};

DrinkCard.propTypes = {
  strDrinkThumb: PropTypes.string,
  strDrink: PropTypes.string,
}.isRequired;

export default DrinkCard;
