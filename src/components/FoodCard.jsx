import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FoodCard(props) {
  const { food, thumb, index, id, comida } = props;

  return (
    <div className="card-field" data-testid={ `${index}-recipe-card` }>
      <Link to={ comida ? `/comidas/${id}` : `/bebidas/${id}` }>
        <img data-testid={ `${index}-card-img` } src={ thumb } alt="rcp" width="200px" />
        <h5 data-testid={ `${index}-card-name` }>{food}</h5>
      </Link>
    </div>
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
