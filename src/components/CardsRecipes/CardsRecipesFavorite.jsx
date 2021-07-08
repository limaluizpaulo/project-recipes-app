import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CardsRecipes.css';
/* import copy from 'clipboard-copy'; */
import imgIcon from '../../images/shareIcon.svg';
import imgBtnFavorite from '../../images/blackHeartIcon.svg';

function copyUrl({ setCopied }) {
  /* copy(`ll`); */
  setCopied(true);
}

function CardsRecipesFavorite({ aux, index }) {
  const [copied, setCopied] = useState(false);
  const { area, image, name, category } = aux;
  return (
    <div>
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
          <h5
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h5>
          <p
            className="card-text"
          /* data-testid="${index}-horizontal-done-date" */
          >
            Data
          </p>
          <button
            type="button"
            disabled
          /* data-testid="${index}-${tagName}-horizontal-tag" */
          >
            Tags
          </button>
          <button type="button" onClick={ () => copyUrl(setCopied) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ imgIcon }
              alt="share-btn"
            />
          </button>
          { copied ? <p>Link copiado!</p> : ''}
          <button type="button">
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
};

export default CardsRecipesFavorite;
