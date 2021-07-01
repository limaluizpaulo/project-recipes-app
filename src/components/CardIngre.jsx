import React from 'react';
import PropTypes from 'prop-types';

export default function CardIngre({ data, index }) {
  const { strIngredient, strIngredient1 } = data;
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        src=""
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
