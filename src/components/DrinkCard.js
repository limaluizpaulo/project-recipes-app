import React from 'react';
import PropTypes from 'prop-types';

const DrinkCard = ({ recipe: { strDrinkThumb, strDrink }, index }) => (
  <div className="cards" data-testid={ `${index}-recipe-card` }>
    <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt={ strDrink } />
    <div className="container">
      <p data-testid={ `${index}-card-name` }>{strDrink}</p>
    </div>
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
