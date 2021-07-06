import React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/card.css';

function RecipeCard({ imagePath, name }) {
  return (
    <div className="recipe-card">
      <img src={ imagePath } alt="prato" />
      <h4>{ name }</h4>
    </div>
  );
}

RecipeCard.propTypes = {
  imagePath: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default RecipeCard;
