import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipe({ image, index, category, recipeName, recipeDate, recipeTags }) {
  return (
    <div>
      <div>
        <img
          src={ image }
          alt="recipe representation"
          data-testid={ `${index}-horizontal-image` }
        />
      </div>
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
        <p data-testid={ `${index}-horizontal-name` }>{recipeName}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipeDate}</p>
        {recipeTags.map((tag, i) => (
          <p
            key={ i }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </p>))}
        <button
          type="button"
          data-testid={
            `${index}-horizontal-share-btn`
          }
        >
          Compartilhar
        </button>
      </div>
    </div>
  );
}

DoneRecipe.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipeDate: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeTags: PropTypes.string.isRequired,
};

export default DoneRecipe;
