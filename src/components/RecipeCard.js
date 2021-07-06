import React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/card.css';

function RecipeCard({ imagePath, name, index }) {
  return (
    <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ imagePath } alt="prato" />
      <span data-testid={ `${index}-card-name` }>{ name }</span>
    </div>
  );
}

RecipeCard.propTypes = {
  imagePath: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default RecipeCard;
