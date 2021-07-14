import React from 'react';
import PropTypes from 'prop-types';

function RecommendedCard({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recomendation-card` }
      key={ index }
    >
      <h5
        data-testid={ `${index}-recomendation-title` }
      >
        {recipe.strMeal || recipe.strDrink}
      </h5>
      <button
        type="button"
      >
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="imagem-da-receita"
        />
      </button>
    </div>
  );
}

RecommendedCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
}.isRequired;

export default RecommendedCard;
