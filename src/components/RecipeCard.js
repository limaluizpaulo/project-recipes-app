import React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/card.css';

function RecipeCard({ imagePath, name, index, link }) {
  return (
    <button
      type="button"
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
      onClick={ link }
    >
      <img
        className="card-img"
        data-testid={ `${index}-card-img` }
        src={ imagePath }
        alt="prato"
      />
      <span data-testid={ `${index}-card-name` }>{ name }</span>
    </button>
  );
}

RecipeCard.propTypes = {
  imagePath: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.func,
  index: PropTypes.number,
}.isRequired;

export default RecipeCard;
