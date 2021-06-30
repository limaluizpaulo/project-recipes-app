import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FoodCard(props) {
  const { food, thumb, index, id, comida } = props;

  return (
    <Link to={ comida ? `/comidas/${id}` : `/bebidas/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ thumb } alt="rcp" width="150px" />
        <h1 data-testid={ `${index}-card-name` }>{food}</h1>
      </div>
    </Link>
  );
}

FoodCard.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  food: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  comida: PropTypes.bool.isRequired,
};

export default FoodCard;
