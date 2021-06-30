import React from 'react';
import PropTypes from 'prop-types';

function FoodCard(props) {
  const { food, thumb, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ thumb } alt="comida" width="150px" />
      <h1 data-testid={ `${index}-card-name` }>{food}</h1>
    </div>
  );
}

FoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  food: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default FoodCard;
