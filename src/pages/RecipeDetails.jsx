import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import RecipeContext, { RecipeDetailContext } from '../context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import { handleFavorite, handleRecipeInProgress } from '../helpers/handleStorageKeys';
// import useInProgressRecipes from '../utils/useInProgressRecipes';
import useIsFavorite from '../utils/useIsFavorite';
import IngredientsList from '../components/IngredientsList';
import RecipesSuggestions from '../components/RecipesSuggestions';

export default function RecipeDetails() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  const { id } = useParams();
  const BASE_URL_DETAIL_MEAL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const BASE_URL_DETAIL_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  // const SEARCH_GENERAL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  // const SEARCH_GENERAL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const youtube = 'https://www.youtube.com/embed/watch?v=';
  // const MAX_SUGGESTIONS = 6;
  const [setRecipeUrl] = useFetchRecipesApi();
  // const [setSuggestionsUrl] = useFetchRecipesApi(MAX_SUGGESTIONS, true);
  const { recipes, idProgress, setIdProgress } = useContext(RecipeContext);
  const { strCategory, strMeal, strDrink, strMealThumb, strDrinkThumb,
    strInstructions, strAlcoholic, strArea, strYoutube } = recipes[0] || [];
  const {
    setIsRecomendation,
  } = useContext(RecipeDetailContext);
  const [isFavorite, setIsFavorite] = useIsFavorite(id);
  const [isCopy, setIsCopy] = useState(false);
  const commonInfo = {
    area: strArea,
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
  };
  const { pathname } = useLocation();
  const pathMeal = pathname.includes('comidas');
  const recipe = pathMeal
    ? {
      ...commonInfo,
      key: 'meals',
      type: 'comida',
      name: strMeal,
      image: strMealThumb,
    }
    : {
      ...commonInfo,
      key: 'cocktails',
      type: 'bebida',
      name: strDrink,
      image: strDrinkThumb,
    };

  const { key, name, image } = recipe;

  useEffect(() => {
    setRecipeUrl(pathMeal ? BASE_URL_DETAIL_MEAL : BASE_URL_DETAIL_DRINK);
    // setSuggestionsUrl(pathMeal ? SEARCH_GENERAL_DRINK : SEARCH_GENERAL_MEAL);
  }, [recipes]);

  useEffect(() => {
    // setIdDetail();
    setIsRecomendation(true);
  }, []);

  // O mesmo código já está no custom hook useProgressRecipes (reaproveitar...)
  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const storedRecipe = Object.entries(recipesInProgress[key])
      .find((recipeId) => recipeId[0] === id);
    if (storedRecipe) {
      setIdProgress(storedRecipe[0]);
    }
    return () => setIdProgress('');
  }, []);

  function embedVideo(youtubeLink = youtube) {
    const idYoutube = youtubeLink.split('=')[1];
    return idYoutube;
  }

  function handleShare() {
    clipboardCopy(window.location.href);
    setIsCopy(true);
  }

  return (
    <div>
      {recipes.length > 0 && (
        <div>
          <h2 data-testid="recipe-title">{ name }</h2>
          <img src={ image } alt={ name } data-testid="recipe-photo" />
          <button type="button" onClick={ () => handleShare() }>
            <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
          </button>
          {isCopy && (<p>Link copiado!</p>)}
          <button
            type="button"
            onClick={ () => {
              handleFavorite({ id, isFavorite, ...recipe });
              setIsFavorite(!isFavorite);
            } }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="heart icon"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="recipe-category">{ pathMeal ? strCategory : strAlcoholic }</p>
          <IngredientsList />
          <p data-testid="instructions">{strInstructions}</p>
          {pathMeal && (
            <embed
              data-testid="video"
              title="Video"
              width="420"
              height="315"
              src={ `${youtube}${embedVideo(strYoutube)}` }
            />)}
          {/* <div data-testid="0-recomendation-card"> Falta criar</div> */}
          <RecipesSuggestions />
          <Link to={ `${pathname}/in-progress` }>
            <button
              style={ bottomFixed }
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => {
                if (!idProgress) {
                  handleRecipeInProgress({ id, key });
                }
              } }
            >
              {idProgress ? 'Continuar Receita' : 'Iniciar Receita'}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
