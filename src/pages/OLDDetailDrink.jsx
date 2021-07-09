import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouteMatch, Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import RecipeContext, { RecipeDetailContext } from '../context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import createListIngredients from '../helpers/ingredientsList';
import { handleFavorite } from '../helpers/handleStorageKeys';

export default function DetailDrink() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  const { id } = useParams();
  const { url } = useRouteMatch();
  const [setRecipeUrl] = useFetchRecipesApi();
  const { recipes, idProgress, setIdProgress,
    setCheckedIngredients } = useContext(RecipeContext);
  const { idDrink, strAlcoholic, strDrinkThumb,
    strDrink, strCategory, strInstructions } = recipes[0] || [];
  const {
    setIsRecomendation,
  } = useContext(RecipeDetailContext);
  const [isFavorite, setIsFavorite] = useState();
  const [isCopy, setIsCopy] = useState(false);
  const BASE_URL_DETAIL_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    setRecipeUrl(BASE_URL_DETAIL_DRINK);
  }, [recipes]);

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const storedDrink = Object.entries(recipesInProgress.cocktails)
      .find((drinkId) => drinkId[0] === id);
    if (storedDrink) {
      setIdProgress(storedDrink[0]);
      setCheckedIngredients(storedDrink[1]);
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

  function handleShare() {
    clipboardCopy(window.location.href);
    setIsCopy(true);
  }

  // function ternary(measure) {
  //   return !measure ? '' : measure;
  // }

  // function handleFavorite() {
  //   const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  //   if (!isFavorite) {
  //     const favRecipe = {
  //       id: idDrink,
  //       type: 'bebida',
  //       area: '',
  //       category: strCategory,
  //       alcoholicOrNot: strAlcoholic,
  //       name: strDrink,
  //       image: strDrinkThumb,
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
      const drinksInProgress = {
        ...recipesInProgress,
        cocktails: {
          ...recipesInProgress.cocktails,
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(drinksInProgress));
    }
  }

  return (
    <div>
      {recipes.length > 0 && (
        <div>
          <h2 data-testid="recipe-title">{ strDrink }</h2>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
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
              handleFavorite({
                id: idDrink,
                type: 'bebida',
                alcoholicOrNot: strAlcoholic,
                category: strCategory,
                name: strDrink,
                image: strDrinkThumb,
              }, isFavorite);
              setIsFavorite(!isFavorite);
            } }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="heart icon"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="recipe-category">{ strAlcoholic }</p>
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
