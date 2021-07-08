import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

import ShareFavIcons from '../ShareFavIcons/ShareFavIcons';

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

  const renderIngredients = () => (
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
  );

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

  const renderYoutubeVideo = () => (
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
  );
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
            <ShareFavIcons
              isFav={ isFav }
              favSave={ localstorageSaveFavoriteRecipe }
              shareCopyLocation={ pathname }
              shareSetCopyLocation={ setCopyLink }
            />
            {
              copyLink
              && <p>Link copiado!</p>
            }
          </div>
          <h3 data-testid="recipe-category">
            { RECIPE_MAIN_KEY === 'strMeals'
              ? recipe.strCategory
              : recipe.strAlcoholic }
          </h3>
        </div>
      </header>
      <section>
        <div>
          <p>Ingredients</p>
          { renderIngredients() }
        </div>
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        <div>
          <h2>Recommendations</h2>
          { renderRecommendation() }
        </div>
        { renderYoutubeVideo() }
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
