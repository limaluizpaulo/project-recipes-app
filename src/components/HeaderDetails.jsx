import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareBtn from './ShareBtn';
import useFavorite from '../hooks/useFavorites';

export default function HeaderDetails({ recipe, pathname }) {
  const [fav, setFav] = useState(false);
  const { handleToggleFavorite } = useFavorite();
  const {
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
    strCategory,
    // strInstructions,
    strAlcoholic,
    idMeal,
    idDrink,
  } = recipe;

  const id = idMeal || idDrink;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let verify = false;
  if (!favoriteRecipes) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  } else {
    verify = favoriteRecipes.some((rec) => rec.id === id);
  }

  useEffect(() => {
    setFav(verify);
  }, [verify]);

  return (
    <>
      {Object.keys(recipe).length ? (
        <div className="img-details-container">
          <img
            className="img-detail"
            src={ strMealThumb || strDrinkThumb }
            alt="avatar"
            data-testid="recipe-photo"
          />
        </div>
      ) : (
        ''
      )}
      <div className="header-details" data-testid="header-details">
        <div className="details-category-name">
          <h4 data-testid="recipe-title">{strMeal || strDrink}</h4>
          <p data-testid="recipe-category">
            {strMeal ? strCategory : strAlcoholic}
          </p>
        </div>

        <div className="share-like">
          <ShareBtn pathname={ pathname } recipe={ recipe } />
          <button
            type="button"
            onClick={ () => handleToggleFavorite(fav, setFav, favoriteRecipes, recipe) }
          >
            <img
              data-testid="favorite-btn"
              src={ fav ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
            />
          </button>
        </div>
      </div>
      {/* <div className="instructions">
        <h3>Instructions</h3>
        <p data-testid="instructions">{strInstructions}</p>
      </div> */}
    </>
  );
}

HeaderDetails.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,

  pathname: PropTypes.string.isRequired,
};
