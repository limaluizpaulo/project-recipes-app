import React, { useContext, useEffect, useState } from 'react';
import copyRecipe from 'clipboard-copy';
import PropTypes from 'prop-types';

import LoginContext from '../context/LoginContext';

import {
  Header,
  Thumb,
  Popup,
} from '../styles/Details';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetailsHeader(props) {
  const { id, recipe } = props;

  const URL = `http://localhost:3000/comidas/${id}`;

  const {
    getLocalStorage,
    addLocalStorageFood,
    removeLocalStorage,
  } = useContext(LoginContext);

  const [copy, setCopy] = useState(false);
  const [isFavorite, setISFavorite] = useState(false);

  function copyURL() {
    copyRecipe(URL);
    setCopy(true);
  }

  function setLS() {
    addLocalStorageFood(id, recipe);
    setISFavorite(true);
  }

  function removeLS() {
    removeLocalStorage(id);
    setISFavorite(false);
  }

  useEffect(() => {
    const xablau = getLocalStorage(id);
    setISFavorite(xablau);
  }, [getLocalStorage, id]);

  function buttonShare() {
    return (
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyURL }
      >
        <img src={ shareIcon } alt="Compartilhar receita" />
      </button>
    );
  }

  function buttonLike() {
    return (
      <button
        type="button"
        onClick={ () => (isFavorite ? removeLS() : setLS()) }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Icon Like"
          data-testid="favorite-btn"
        />
      </button>
    );
  }

  return (
    <Header>
      <Thumb
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt="Foto da receita"
      />
      <section>
        <div>
          <h1 data-testid="recipe-title">
            { recipe.strMeal}
          </h1>
          <h2 data-testid="recipe-category">
            { recipe.strCategory }
          </h2>
        </div>

        <section>
          { buttonShare() }
          <Popup
            copied={ copy }
            onTransitionEnd={ () => setCopy(false) }
          >
            Link copiado!
          </Popup>
          { buttonLike() }
        </section>
      </section>
    </Header>
  );
}

FoodDetailsHeader.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    dateModified: PropTypes.string,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strCreativeCommonsConfirmed: PropTypes.string,
    strDrinkAlternate: PropTypes.string,
    strImageSource: PropTypes.string,
    strIngredient1: PropTypes.string,
    strIngredient10: PropTypes.string,
    strIngredient11: PropTypes.string,
    strIngredient12: PropTypes.string,
    strIngredient13: PropTypes.string,
    strIngredient14: PropTypes.string,
    strIngredient15: PropTypes.string,
    strIngredient16: PropTypes.string,
    strIngredient17: PropTypes.string,
    strIngredient18: PropTypes.string,
    strIngredient19: PropTypes.string,
    strIngredient2: PropTypes.string,
    strIngredient20: PropTypes.string,
    strIngredient3: PropTypes.string,
    strIngredient4: PropTypes.string,
    strIngredient5: PropTypes.string,
    strIngredient6: PropTypes.string,
    strIngredient7: PropTypes.string,
    strIngredient8: PropTypes.string,
    strIngredient9: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeasure1: PropTypes.string,
    strMeasure10: PropTypes.string,
    strMeasure11: PropTypes.string,
    strMeasure12: PropTypes.string,
    strMeasure13: PropTypes.string,
    strMeasure14: PropTypes.string,
    strMeasure15: PropTypes.string,
    strMeasure16: PropTypes.string,
    strMeasure17: PropTypes.string,
    strMeasure18: PropTypes.string,
    strMeasure19: PropTypes.string,
    strMeasure2: PropTypes.string,
    strMeasure20: PropTypes.string,
    strMeasure3: PropTypes.string,
    strMeasure4: PropTypes.string,
    strMeasure5: PropTypes.string,
    strMeasure6: PropTypes.string,
    strMeasure7: PropTypes.string,
    strMeasure8: PropTypes.string,
    strMeasure9: PropTypes.string,
    strSource: PropTypes.string,
    strTags: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default FoodDetailsHeader;
