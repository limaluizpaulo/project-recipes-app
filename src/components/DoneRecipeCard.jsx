import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ recipe, index }) {
  const [isCopy, setIsCopy] = useState(false);

  const {
    image,
    category,
    name,
    doneDate,
    tags,
    id,
    area,
    alcoholicOrNot,
    type,
  } = recipe;

  function handleShare(idRecipe, typeRecipe) {
    const TRAINLING_URL = -1;
    const url = window.location.href
      .split('/')
      .slice(0, TRAINLING_URL)
      .join('/')
      .concat(`/${typeRecipe}s/${idRecipe}`);
    clipboardCopy(url);
    setIsCopy(true);
  }

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          width="100"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
        </p>
        <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { doneDate }
      </p>
      <button
        type="button"
        onClick={ () => handleShare(id, type) }
      >
        <img
          src={ shareIcon }
          alt={ name }
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {isCopy && (<p>Link copiado!</p>)}
      { tags && tags.map((tag) => (
        <p
          key={ index }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      ))}
    </div>
  );
}

export default DoneRecipeCard;

DoneRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
  index: PropTypes.number.isRequired,
};
