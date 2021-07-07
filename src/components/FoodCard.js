import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style/FoodCard.css';

export default function FoodCard({ recipes, order, type }) {
  const name = type === 'comidas' ? 'strMeal' : 'strDrink';
  const id = type === 'comidas' ? 'idMeal' : 'idDrink';
  const urlImage = type === 'comidas' ? 'strMealThumb' : 'strDrinkThumb';

  return (
    <Link to={ `${type}/${recipes[id]} ` }>
      <div key={ recipes[name] } data-testid={ `${order}-recipe-card` }>
        <img
          src={ recipes[urlImage] }
          alt={ recipes[name] }
          data-testid={ `${order}-card-img` }
          className="imageRecipes"
        />
        <p data-testid={ `${order}-card-name` }>{recipes[name]}</p>
      </div>
    </Link>
  );
}
FoodCard.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
};
