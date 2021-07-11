import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardRecipe({ data, index }) {
  const { strMealThumb, strMeal, strDrink, strDrinkThumb } = data;
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <Link to={ data.idDrink ? `/bebidas/${data.idDrink}` : `/comidas/${data.idMeal}` }>
        <img
          className="card_image"
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
          data-testid={ `${index}-card-img` }
        />
        <div className="recipe-name">
          <p data-testid={ `${index}-card-name` }>{strMeal || strDrink}</p>
        </div>
      </Link>
    </div>
  );
}

CardRecipe.propTypes = {
  data: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
