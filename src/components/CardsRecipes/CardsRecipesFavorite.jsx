import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/CardsRecipes.css';
import copy from 'clipboard-copy';
import imgIcon from '../../images/shareIcon.svg';
import imgBtnFavorite from '../../images/blackHeartIcon.svg';

function copyUrl(setCopied, type, id) {
  copy(`http://localhost:3000/${type}s/${id}`).then(() => setCopied(true));
}

function CardsRecipesFavorite({ aux: {
  area, image, name, category, alcoholicOrNot, type, id }, index, pathname, remove }, aux) {
  const favorite = pathname.includes('favoritas');
  console.log(aux.meals);
  let typeFeita = false;
  if (type === 'comida') {
    typeFeita = true;
  }
  const [copied, setCopied] = useState(false);
  let alcohol = false;
  if (alcoholicOrNot === 'Alcoholic') {
    alcohol = true;
  }
  return (
    <div className="border">
      <Link to={ `/${type}s/${id}` }>
        <h5
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </h5>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${area} - ${category}` }
      </p>
      {alcohol ? <p data-testid={ `${index}-horizontal-top-text` }>Alcoholic</p> : ''}
      <button type="button" onClick={ () => copyUrl(setCopied, type, id) }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ imgIcon }
          alt="share-btn"
        />
      </button>
      { copied ? <p>Link copiado!</p> : ' '}
      {favorite && (
        <button
          type="button"
          onClick={ () => remove(id) }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ imgBtnFavorite }
            alt="btn"
          />
        </button>
      )}
      <Link to={ `/${type}s/${id}` }>
        <img
          className="img-tam"
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt="..."
        />
      </Link>
      <p>{ `/${type}s/${id}` }</p>
    </div>
  );
}

CardsRecipesFavorite.propTypes = {
  aux: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default CardsRecipesFavorite;
