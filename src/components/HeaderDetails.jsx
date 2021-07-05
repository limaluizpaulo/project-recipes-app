import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';
import '../styles/DoneRecipes.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function HeaderDetails() {
  const { drinkDetails } = useContext(DrinksContext);
  const { foodDetails } = useContext(RecipesContext);
  const [copied, setCopied] = useState(false);

  const { pathname } = useLocation();

  const NUMBER_TO_VERIFICATION = -1;

  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;

  const shareRecipe = () => {
    // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopied(true);
  };

  return getDrinksDetails ? (
    <header>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
      />
      <section>
        <div className="Title-and-Category">
          <span data-testid="recipe-title">{ drinkDetails.strDrink}</span>
          <span data-testid="recipe-category">{ drinkDetails.strAlcoholic }</span>
        </div>
        <div className="Like-and-Share">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => shareRecipe() }
          >
            <img src={ shareIcon } alt="Icon Share" />
          </button>
          <span
            className={ `${copied
              ? 'alert-show' : 'alert-hidden'}` }
            onTransitionEnd={ () => setCopied(false) }
          >
            Link copiado!
          </span>
          <button type="button" data-testid="favorite-btn">
            <img src={ whiteHeartIcon } alt="Icon Like" />
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
      />

      <section>
        <div className="Title-and-Category">
          <span data-testid="recipe-title">{ foodDetails.strMeal }</span>
          <span data-testid="recipe-category">{ foodDetails.strCategory }</span>
        </div>
        <div className="Like-and-Share">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => shareRecipe() }
          >
            <img src={ shareIcon } alt="Icon Share" />
          </button>
          <span
            className={ `${copied
              ? 'alert-show' : 'alert-hidden'}` }
            onTransitionEnd={ () => setCopied(false) }
          >
            Link copiado!
          </span>
          <button type="button" data-testid="favorite-btn">
            <img src={ whiteHeartIcon } alt="Icon Like" />
          </button>
        </div>
      </section>
    </header>
  );
}

export default HeaderDetails;
