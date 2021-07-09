import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { handleFavorite } from '../helpers/handleStorageKeys';
import RecipeContext from '../context';

function StoredRecipeCard({ recipe, index }) {
  const { pathname } = useLocation();
  const { isFavorite, setIsFavorite } = useContext(RecipeContext);
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
    const TRAILING_URL = -1;
    const url = window.location.href
      .split('/')
      .slice(0, TRAILING_URL)
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
      {doneDate && (
        <p data-testid={ `${index}-horizontal-done-date` }>
          { doneDate }
        </p>)}
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
      {pathname.includes('fav') && (
        <button
          type="button"
          onClick={ () => {
            handleFavorite({ ...recipe, isFavorite });
            setIsFavorite(!isFavorite);
          } }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="heart icon"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>)}
      {isCopy && (<p>Link copiado!</p>)}
      { tags && tags.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      ))}
    </div>
  );
}

export default StoredRecipeCard;

StoredRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
  index: PropTypes.number.isRequired,
};
