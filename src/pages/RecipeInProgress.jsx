import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import RecipeContext from '../context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import { handleDoneRecipes,
  handleFavorite } from '../helpers/handleStorageKeys';
import useIsFavorite from '../utils/useIsFavorite';
import IngredientsCheckList from '../components/IngredientsCheckList';

export default function RecipeInProgress() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  const history = useHistory();
  const { id } = useParams();
  const [setRecipeUrl] = useFetchRecipesApi();
  const [isFavorite, setIsFavorite] = useIsFavorite(id);
  const { recipes, setIdProgress, isDisable } = useContext(RecipeContext);
  const { strArea, strCategory, strMeal, strMealThumb, strAlcoholic, strDrink,
    strDrinkThumb, strInstructions, strTags } = recipes[0] || [];
  const [isCopy, setIsCopy] = useState(false);
  const BASE_URL_DETAIL_MEAL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const BASE_URL_DETAIL_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const commonInfo = {
    area: strArea,
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    strTags,
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
  }, [recipes]);

  useEffect(() => {
    setIdProgress(id);
  }, []);

  function handleShare() {
    const url = window.location.href
      .split('/')
      .filter((baseUrl) => baseUrl !== 'in-progress') // usar slice
      .join('/');
    clipboardCopy(url);
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
          <p data-testid="recipe-category">{strCategory}</p>
          <IngredientsCheckList keyInProgress={ key } />
          <p data-testid="instructions">{strInstructions}</p>
          <button
            style={ bottomFixed }
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isDisable }
            onClick={ () => {
              handleDoneRecipes({ id, ...recipe });
              history.push('/receitas-feitas');
            } }
          >
            Finalizar Receita
          </button>
        </div>
      )}
    </div>
  );
}
