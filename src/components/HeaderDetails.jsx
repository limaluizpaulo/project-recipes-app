import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';

import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';
import LoginContext from '../context/LoginContext';
import '../styles/HeaderDetails.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function HeaderDetails() {
  const { drinkDetails } = useContext(DrinksContext);
  const { foodDetails } = useContext(RecipesContext);
  const {
    getLocalStorage,
    addLocalStorage,
    removeLocalStorage,
  } = useContext(LoginContext);

  const [copied, setCopied] = useState(false);
  const [isFavorite, setISFavorite] = useState(false);

  const { pathname } = useLocation();
  const { id } = useParams();

  const NUMBER_TO_VERIFICATION = -1;

  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;
  const shareRecipe = () => {
    // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopied(true);
  };

  function setLS() {
    addLocalStorage(id, getDrinksDetails, drinkDetails, foodDetails);
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

  return getDrinksDetails ? (
    <header>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
        className="thumb"
      />
      <section className="title-and-buttons">
        <div className="title-and-category">
          <span
            className="title"
            data-testid="recipe-title"
          >
            { drinkDetails.strDrink}

          </span>
          <span
            className="subtitle"
            data-testid="recipe-category"
          >
            { drinkDetails.strAlcoholic }

          </span>
        </div>
        <div className="like-and-share">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => shareRecipe() }
          >
            <img src={ shareIcon } alt="Icon Share" />
          </button>
          <div className="popup">
            <div
              className={ `${copied
                ? 'alert-show' : 'alert-hidden'}` }
              onTransitionEnd={ () => setCopied(false) }
            >
              Link copiado!
            </div>
          </div>

          <button
            type="button"
            onClick={ () => (isFavorite ? removeLS() : setLS()) }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Icon Like"
            />
          </button>
        </div>
      </section>
    </header>
  ) : (
    <header>
      <img
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        data-testid="recipe-photo"
        className="thumb"
      />

      <section className="title-and-buttons">
        <div className="title-and-category">
          <span
            className="title"
            data-testid="recipe-title"
          >
            { foodDetails.strMeal }

          </span>
          <span
            className="subtitle"
            data-testid="recipe-category"
          >
            { foodDetails.strCategory }

          </span>
        </div>
        <div className="like-and-share">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => shareRecipe() }
          >
            <img src={ shareIcon } alt="Icon Share" />
          </button>
          <div className="popup">
            <span
              className={ `${copied
                ? 'alert-show' : 'alert-hidden'}` }
              onTransitionEnd={ () => setCopied(false) }
            >
              Link copiado!
            </span>
          </div>
          <button
            type="button"
            onClick={ () => (isFavorite ? removeLS() : setLS()) }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Icon Like"
            />
          </button>
        </div>
      </section>
    </header>
  );
}

export default HeaderDetails;
