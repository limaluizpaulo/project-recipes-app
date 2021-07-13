import React from 'react';
import PropTypes from 'prop-types';

import './style/FoodCard.css';

export default function FoodCard({ recipes, order, type, isRecomm }) {
  const name = type === 'comidas' ? 'strMeal' : 'strDrink';
  const id = type === 'comidas' ? 'idMeal' : 'idDrink';
  const urlImage = type === 'comidas' ? 'strMealThumb' : 'strDrinkThumb';
  const to = `http://localhost:3000/${type}/${recipes[id]}`;
  return (
    <a
      href={ to }
    >
      <div key={ recipes[name] } data-testid={ `${order}-recipe-card` }>
        <img
          src={ recipes[urlImage] }
          alt={ recipes[name] }
          data-testid={ `${order}-card-img` }
          className="imageRecipes"
        />
        {
          isRecomm
            ? <p data-testid={ `${order}-recomendation-title` }>{recipes[name]}</p>
            : <p data-testid={ `${order}-card-name` }>{recipes[name]}</p>
        }
      </div>
    </a>
  );
}

FoodCard.defaultProps = {
  isRecomm: false,
};

FoodCard.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  isRecomm: PropTypes.bool,
};
