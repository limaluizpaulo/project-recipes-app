import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

import { useHistory, useLocation } from 'react-router-dom';

import './style/Details.css';
import RecipesContext from '../../context/RecipesContext';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

/*
---Refactoring---
TODO:
  - Make new HTML components to make the code more clean;
  - Split conditional logic;
  - Keep common logic.
*/
function Details({ id, recipe, recommendations }) {
  // CONSTANTS
  const MAX_INGREDIENTS = 20; // 20, because the max of meals usage is 20 and drinks is 15.
  const RECIPE_MAIN_KEY = recipe.typeMainKey;
  const RECOMM_KEY = recommendations.typeMainKey;

  // CONTEXT
  const {
    favoritedRecipes,
    localstorageSaveFavoriteRecipe } = useContext(RecipesContext);

  // STATES
  const [isFav, setIsFav] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  // ROUTER HOOKS
  const { pathname } = useLocation();

  // FUNCTIONS
  const organizeIngredients = () => {
    let tempArray = [];
    for (let number = 1; number <= MAX_INGREDIENTS; number += 1) {
      if (recipe[`strIngredient${number}`]) {
        tempArray = [...tempArray, [
          recipe[`strIngredient${number}`],
          recipe[`strMeasure${number}`],
        ]];
      }
    }
    setIngredients(tempArray);
  };

  // EFFECTS
  useEffect(() => {
    organizeIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const arrayOfRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (arrayOfRecipes) {
      const found = arrayOfRecipes.find((element) => (
        element.id === id
      ));
      if (found) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritedRecipes]);

  // RENDER FUNCTIONS
  const renderRecommendation = () => {
    const recommKeyThumb = `${RECOMM_KEY}Thumb`;
    return (
      <Carousel itemsToShow={ 2 } pagination={ false } disableArrowsOnEnd={ false }>
        {
          recommendations.map((
            { [RECOMM_KEY]: title, [recommKeyThumb]: thumb },
            index,
          ) => (
            <img
              key={ title }
              src={ thumb }
              alt={ title }
              style={ { width: 200 } }
              data-testid={ `${index}-recomendation-card` }
            />
          ))
        }
      </Carousel>
    );
  };

  return (
    <>
      <header>
        {/* TODO: Remove 'style' attribute */}
        <img
          src={ recipe[`${RECIPE_MAIN_KEY}Thumb`] }
          alt="test"
          style={ { width: 200 } }
          data-testid="recipe-photo"
        />
        <div>
          <h1 data-testid="recipe-title">{recipe[RECIPE_MAIN_KEY]}</h1>
          <div>
            <button
              type="button"
              onClick={ () => {
                copy(`http://localhost:3000${pathname}`);
                // eslint-disable-next-line no-alert
                setCopyLink(true);
              } }
            >
              <img data-testid="share-btn" src={ shareIcon } alt="Share Icon" />
            </button>
            <button
              type="button"
              onClick={
                () => localstorageSaveFavoriteRecipe(recipe, !isFav)
              }
            >
              {
                isFav
                  ? (
                    <img
                      data-testid="favorite-btn"
                      src={ blackHeartIcon }
                      alt="Favorited"
                    />
                  )
                  : (
                    <img
                      data-testid="favorite-btn"
                      src={ whiteHeartIcon }
                      alt="Not Favorited"
                    />
                  )
              }
            </button>
            {
              copyLink
              && <p>Link copiado!</p>
            }
          </div>
          <h3 data-testid="recipe-category">
            {
              mealsOrDrinks === 'meals'
                ? recipe.strCategory
                : recipe.strAlcoholic
            }
          </h3>
        </div>
      </header>
      <section>
        <div>
          <p>Ingredients</p>
          <ul>
            {
              ingredients.map(([ingredient, quantity], index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                  {', '}
                  {quantity}
                </li>
              ))
            }
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        <div>
          <h2>Recommendations</h2>
          {
            renderRecommendation()
          }
        </div>
        {
          recipe.strYoutube
            && (
              <div>
                <h2>Video</h2>
                <iframe
                  title={ recipe[RECIPE_MAIN_KEY] }
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                  width="420"
                  height="315"
                  data-testid="video"
                />
              </div>
            )
        }

      </section>
    </>
  );
}

Details.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape(PropTypes.object).isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Details;
