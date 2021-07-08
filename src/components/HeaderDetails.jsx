import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';

import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';
import LoginContext from '../context/LoginContext';
import { Header, Thumb, Popup } from '../styles/Details';

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
  }, [drinkDetails, foodDetails, getDrinksDetails, getLocalStorage, id]);

  return getDrinksDetails ? (
    <Header>
      <Thumb
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
      />
      <section>
        <div>
          <h1 data-testid="recipe-title">
            { drinkDetails.strDrink}
          </h1>
          <h2 data-testid="recipe-category">
            { drinkDetails.strAlcoholic }
          </h2>
        </div>
        <section>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => shareRecipe() }
          >
            <img src={ shareIcon } alt="Icon Share" />
          </button>
          <Popup
            copied={ copied }
            onTransitionEnd={ () => setCopied(false) }
          >
            Link copiado!
          </Popup>
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
        </section>
      </section>
    </Header>
  ) : (
    <Header>
      <Thumb
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        data-testid="recipe-photo"
      />

      <section>
        <div>
          <h1 data-testid="recipe-title">
            { foodDetails.strMeal }
          </h1>
          <h2 data-testid="recipe-category">
            { foodDetails.strCategory }
          </h2>
        </div>
        <section>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => shareRecipe() }
          >
            <img src={ shareIcon } alt="Icon Share" />
          </button>
          <Popup
            copied={ copied }
            onTransitionEnd={ () => setCopied(false) }
          >
            Link copiado!
          </Popup>
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
        </section>
      </section>
    </Header>
  );
}

export default HeaderDetails;
