import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function CardIngre({ data, index }) {
  const { strIngredient, strIngredient1 } = data;
  const { pathname } = useHistory().location;
  const checkThumb = () => {
    if (pathname.includes('comida')) {
      return (`https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`);
    }
    if (pathname.includes('bebida')) {
      return (`https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`);
    }
  };
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        src={ checkThumb() }
        alt={ strIngredient || strIngredient1 }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{strIngredient || strIngredient1}</p>
    </div>
  );
}

CardIngre.propTypes = {
  data: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
