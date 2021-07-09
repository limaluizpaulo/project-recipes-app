import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CardsRecipes.css';
import copy from 'clipboard-copy';
import imgIcon from '../../images/shareIcon.svg';
import imgBtnFavorite from '../../images/blackHeartIcon.svg';

function copyUrl(setCopied, type, id) {
  copy(`http://localhost:3000/${type}s/${id}`);
  /* console.log(navigator.clipboard.readText()); */
  setCopied(true);
}

function CardsRecipesFavorite({ aux, index, removeFavorites }) {
  const [copied, setCopied] = useState(false);
  const { area, image, name, category, alcoholicOrNot, type, id } = aux;
  let alcohol = false;
  if (alcoholicOrNot === 'Alcoholic') {
    alcohol = true;
  }
  return (
    <div className="border">
      <div>
        <img
          className="img-tam"
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt="..."
        />
      </div>
      <div>
        <div>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </p>
          {alcohol ? <p data-testid={ `${index}-horizontal-top-text` }>Alcoholic</p> : ''}
          <h5
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h5>
          <button type="button" onClick={ () => copyUrl(setCopied, type, id) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ imgIcon }
              alt="share-btn"
            />
          </button>
          { copied ? <p>Link copiado!</p> : ''}
          <button type="button" onClick={ () => removeFavorites(id) }>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ imgBtnFavorite }
              alt="btn"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

CardsRecipesFavorite.propTypes = {
  aux: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired,
  removeFavorites: PropTypes.func.isRequired,
};

export default CardsRecipesFavorite;