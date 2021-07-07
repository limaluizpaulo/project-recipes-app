import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouteMatch, Link } from 'react-router-dom';
import RecipeContext, { RecipeDetailContext } from '../context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import createListIngredients from '../helpFunctions/ingredientsList';
import { handleFavorite } from '../helpFunctions/handleStorageKeys';

export default function DetailMeal() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };
  const youtube = 'https://www.youtube.com/embed/watch?v=';

  const { id } = useParams();
  const { url } = useRouteMatch();
  const [setRecipeUrl] = useFetchRecipesApi();
  const { recipes, idProgress, setIdProgress,
    setCheckedIngredients } = useContext(RecipeContext);
  const { strCategory, strMeal, strMealThumb,
    strInstructions, strYoutube } = recipes[0] || [];
  const {
    setIsRecomendation,
  } = useContext(RecipeDetailContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const BASE_URL_DETAIL_MEAL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    setRecipeUrl(BASE_URL_DETAIL_MEAL);
  }, [recipes]);

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const storedMeal = Object.entries(recipesInProgress.meals)
      .find((mealId) => mealId[0] === id);
    if (storedMeal) {
      setIdProgress(storedMeal[0]);
      setCheckedIngredients(storedMeal[1]);
    }
    setIsRecomendation(true);
  }, []);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes) setIsFavorite(favRecipes.some((favId) => favId.id === id));
  }, [isFavorite]);

  // function listIngredients(recipe) {
  //   const list = [];

  //   list.push(Object.entries(recipe)
  //     .filter((ingredient) => (
  //       ingredient[0].includes('strIngredient')
  //     ))
  //     .filter((nullConditional) => (
  //       nullConditional[1] !== null
  //     ))
  //     .map((setIngredients) => (
  //       setIngredients[1].length > 0 && setIngredients[1]
  //     ))
  //     .filter((finalList) => finalList !== false));

  //   list.push(Object.entries(recipe)
  //     .filter((ingredient) => (
  //       ingredient[0].includes('strMeasure')
  //     ))
  //     .filter((nullConditional) => (
  //       nullConditional[1] !== null
  //     ))
  //     .map((setIngredients) => (
  //       setIngredients[1].length !== ' ' && setIngredients[1]
  //     ))
  //     .filter((finalList) => finalList !== false));

  //   return list;
  // }

  function embedVideo(youtubeLink = youtube) {
    const idYoutube = youtubeLink.split('=')[1];
    return idYoutube;
  }

  function handleShare() {
    clipboardCopy(window.location.href);
    setIsCopy(true);
  }

  // function handleFavorite() {
  //   const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  //   if (!isFavorite) {
  //     const favRecipe = {
  //       id: idMeal,
  //       type: 'comida',
  //       area: strArea,
  //       category: strCategory,
  //       alcoholicOrNot: '',
  //       name: strMeal,
  //       image: strMealThumb,
  //     };
  //     localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes, favRecipe]));
  //   } else {
  //     const favIndex = favRecipes.indexOf(favRecipes.find((favId) => favId.id === id));
  //     const newStorage = [...favRecipes.slice(0, favIndex),
  //       ...favRecipes.slice(favIndex + 1)];
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  //   }
  //   setIsFavorite(!isFavorite);
  // }

  function handleRecipeInProgress() {
    // setIdProgress(idDetail);
    // setRecipeInProgress(recipes);
    if (!idProgress) {
      // const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipesInProgress = JSON.parse(localStorage
        .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
      const mealsInProgress = {
        ...recipesInProgress,
        meals: {
          ...recipesInProgress.meals,
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(mealsInProgress));
    }
  }

  return (
    <div>
      {recipes.length > 0 && (
        <div>
          <h2 data-testid="recipe-title">{ strMeal }</h2>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid="recipe-photo"
          />
          <button
            type="button"
            onClick={ () => handleShare() }
          >
            <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
          </button>
          {isCopy && (<p>Link copiado!</p>)}
          <button
            type="button"
            onClick={ () => {
              handleFavorite(recipes[0], id, 'comida', isFavorite);
              setIsFavorite(!isFavorite);
            } }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="heart icon"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="recipe-category">{ strCategory }</p>
          <ul>
            {createListIngredients(recipes).map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{strInstructions}</p>
          <embed
            data-testid="video"
            title="Video"
            width="420"
            height="315"
            src={ `${youtube}${embedVideo(strYoutube)}` }
          />
          <div data-testid="0-recomendation-card"> Falta criar</div>
          <Link to={ `${url}/in-progress` }>
            <button
              style={ bottomFixed }
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleRecipeInProgress }
            >
              {idProgress ? 'Continuar Receita' : 'Iniciar Receita'}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
