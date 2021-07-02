import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareBtn from './ShareBtn';

export default function HeaderDetails({ recipe, pathname }) {
  // idMeal, idDrink,
  const {
    strMeal, strDrink, strMealThumb, strDrinkThumb,
    strCategory, strInstructions, strAlcoholic,
  } = recipe;

  return (
    <>
      <header>
        <div className="header-details">
          <h4 data-testid="recipe-title">{strMeal || strDrink}</h4>
          <ShareBtn pathname={ pathname } />
          <button type="button">
            <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite" />
          </button>
        </div>
        <img
          className="img-detail"
          src={ strMealThumb || strDrinkThumb }
          alt="avatar"
          data-testid="recipe-photo"
        />
      </header>
      <p data-testid="recipe-category">{strMeal ? strCategory : strAlcoholic}</p>
      <p data-testid="instructions">{strInstructions}</p>
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
