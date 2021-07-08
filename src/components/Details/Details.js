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
  const RECIPE_MAIN_KEY = recipe.typeMainKey;
  const RECOMM_KEY = recommendations.typeMainKey;
  // CONTEXT
  const {
    favoritedRecipes,
    localstorageSaveFavoriteRecipe,
    ingredients: recipeIngredients,
  } = useContext(RecipesContext);

  // STATES
  const [isFav, setIsFav] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  // ROUTER HOOKS
  const { pathname } = useLocation();

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

  useEffect(() => {
    setIngredients(recipeIngredients);
  }, [recipeIngredients]);
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
          recommendations
          && recommendations.recipes.map((
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
          alt="Recipe"
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
              recipe={ recipe }
            />
            {
              copyLink
              && <p>Link copiado!</p>
            }
          </div>
          <h3 data-testid="recipe-category">
            { RECIPE_MAIN_KEY === 'strMeal'
              ? recipe.strCategory
              : recipe.strAlcoholic }
          </h3>
        </div>
      </header>
      <section>
        <div>
          <h2>Ingredients</h2>
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
  recipe: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    typeMainKey: PropTypes.string.isRequired,
  }).isRequired,
  recommendations: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.object),
    typeMainKey: PropTypes.string,
  }).isRequired,
};

// Details.propTypes = {
//   id: PropTypes.string.isRequired,
//   recipe: PropTypes.shape({}).isRequired,
//   recommendations: PropTypes.shape({}).isRequired,
// };

export default Details;
