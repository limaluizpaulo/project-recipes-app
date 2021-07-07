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

function Details({ id, mealsOrDrinks }) {
  const {
    startedRecipes,
    localstorageSaveStartedRecipe,
    favoritedRecipes,
    localstorageSaveFavoriteRecipe } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({});
  const [recipeKeyword, setRecipeKeyword] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsKey, setRecommendationsKey] = useState('');
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const { push } = useHistory();
  const { pathname } = useLocation();

  const MAX_DRINKS_INGREDIENTS = 15;
  const MAX_MEALS_INGREDIENTS = 20;

  const MAX_RECOMMENDATIONS = 6;

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

  const getRecipe = async () => {
    const { [mealsOrDrinks]: [gotRecipe] } = await fetchRecipesById(mealsOrDrinks, id);

    setRecipe(gotRecipe);
  };

  const getRecomendations = async (type) => {
    const { [type]: recipeType } = await fetchAllRecipes(type);
    setRecommendations(recipeType.slice(0, MAX_RECOMMENDATIONS));
  };

  const renderRecommendation = () => {
    const recommendationsKeyThumb = `${recommendationsKey}Thumb`;
    return (
      <Carousel itemsToShow={ 2 } pagination={ false } disableArrowsOnEnd={ false }>
        {
          recommendations.map((
            { [recommendationsKey]: title, [recommendationsKeyThumb]: thumb },
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
      setRecipeKeyword('strMeal');
      setMaxIngredients(MAX_MEALS_INGREDIENTS);
      getRecomendations(DRINKS);
      setRecommendationsKey('strDrink');
    }
    if (mealsOrDrinks === DRINKS) {
      setRecipeKeyword('strDrink');
      getRecomendations(MEALS);
      setRecommendationsKey('strMeal');
    }
    getRecipe();
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
          src={ recipe[`${recipeKeyword}Thumb`] }
          alt="test"
          style={ { width: 200 } }
          data-testid="recipe-photo"
        />
        <div>
          <h1 data-testid="recipe-title">{recipe[recipeKeyword]}</h1>
          <div>
            <button
              type="button"
              data-testid="share-btn"
              onClick={
                () => { copy(`http://localhost:3000/${pathname}`); }
              }
            >
              <img src={ shareIcon } alt="Share Icon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={
                () => localstorageSaveFavoriteRecipe(recipe, !isFav)
              }
            >
              {
                isFav
                  ? <img src={ blackHeartIcon } alt="Favorited" />
                  : <img src={ whiteHeartIcon } alt="Not Favorited" />
              }
            </button>
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
                  title={ recipe[recipeKeyword] }
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
  mealsOrDrinks: PropTypes.string.isRequired,
};

export default Details;
