import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

import { useHistory, useLocation } from 'react-router-dom';
import { fetchRecipesById, fetchAllRecipes } from '../../services/recipesAPI';

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
  const {
    startedRecipes,
    localstorageSaveStartedRecipe,
    favoritedRecipes,
    localstorageSaveFavoriteRecipe } = useContext(RecipesContext);
  const [recipeMainKey] = useState(recipe.typeMainKey);
  const [recommKey] = useState(recommendations.typeMainKey);
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const { push } = useHistory();
  const { pathname } = useLocation();

  const MAX_DRINKS_INGREDIENTS = 15;
  const MAX_MEALS_INGREDIENTS = 20;

  const [maxIngredients, setMaxIngredients] = useState(MAX_DRINKS_INGREDIENTS);
  const [ingredients, setIngredients] = useState([]);

  const organizeIngredients = () => {
    let tempArray = [];
    for (let number = 1; number <= maxIngredients; number += 1) {
      if (recipe[`strIngredient${number}`]) {
        tempArray = [...tempArray, [
          recipe[`strIngredient${number}`],
          recipe[`strMeasure${number}`],
        ]];
      }
    }
    setIngredients(tempArray);
  };

  const renderRecommendation = () => {
    const recommKeyThumb = `${recommKey}Thumb`;
    return (
      <Carousel itemsToShow={ 2 } pagination={ false } disableArrowsOnEnd={ false }>
        {
          recommendations.map((
            { [recommKey]: title, [recommKeyThumb]: thumb },
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

  useEffect(() => {
    const MEALS = 'meals';
    const DRINKS = 'drinks';
    if (mealsOrDrinks === MEALS) {
      setRecipeMainKey('strMeal');
      setMaxIngredients(MAX_MEALS_INGREDIENTS);
      setRecommKey('strDrink');
    }
    if (mealsOrDrinks === DRINKS) {
      setRecipeMainKey('strDrink');
      setRecommKey('strMeal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    organizeIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  useEffect(() => {
    const arrayOfRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const objInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (arrayOfRecipes) {
      const found = arrayOfRecipes.find((element) => (
        element.id === id
      ));
      if (found) setAlreadyStarted(true);
    }

    if (objInProgress) {
      const isVerified = (mealsOrDrinks === 'meals' && objInProgress.meals[id])
      || (mealsOrDrinks === 'drinks' && objInProgress.cocktails[id]);
      if (isVerified) {
        setIsInProgressRecipe(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedRecipes]);

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
  }, [favoritedRecipes]);

  return (
    <>
      <header>
        {/* TODO: Remove 'style' attribute */}
        <img
          src={ recipe[`${recipeMainKey}Thumb`] }
          alt="test"
          style={ { width: 200 } }
          data-testid="recipe-photo"
        />
        <div>
          <h1 data-testid="recipe-title">{recipe[recipeMainKey]}</h1>
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
                  title={ recipe[recipeMainKey] }
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                  width="420"
                  height="315"
                  data-testid="video"
                />
              </div>
            )
        }
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe"
          onClick={ () => {
            if (!isInProgressRecipe) {
              localstorageSaveStartedRecipe(recipe, ingredients);
            }

            push(`${pathname}/in-progress`);
          } }
          hidden={ alreadyStarted && !isInProgressRecipe }
        >
          { isInProgressRecipe ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>

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
