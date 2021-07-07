import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipeContext from '../context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import createListIngredients from '../helpFunctions/ingredientsList';
import { checkListIngredients, handleDoneRecipes,
  handleFavorite } from '../helpFunctions/handleStorageKeys';

export default function InProgressMeal() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  const listIngredients = useRef();
  const history = useHistory();
  const { id } = useParams();
  const [setRecipeUrl] = useFetchRecipesApi();
  const { recipes, setIdProgress, checkedIngredients,
    setCheckedIngredients } = useContext(RecipeContext);
  const { idMeal, strArea, strCategory, strMeal, strMealThumb,
    strInstructions, strTags } = recipes[0] || [];
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [countChecked, setCountChecked] = useState(0);
  const BASE_URL_DETAIL_MEAL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  // function createListIngredients() {
  //   let ingredientsList = [];
  //   const ingredients = Object.entries(recipes[0]).filter(([key, value]) => (
  //     value && value !== ' ' && (
  //       key.includes('strIngredient') || key.includes('strMeasure'))));

  //   for (let i = 0; i < ingredients.length / 2; i += 1) {
  //     ingredientsList = [...ingredientsList,
  //       `${ingredients[i][1]} - ${ingredients[i + (ingredients.length / 2)][1]}`];
  //   }
  //   return ingredientsList;
  // }

  useEffect(() => {
    setRecipeUrl(BASE_URL_DETAIL_MEAL);
    if (recipes[0]) {
      listIngredients.current = createListIngredients(recipes); // useRef usado só a título de curiosidade
    }
  }, [recipes]);

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const storedMeal = Object.entries(recipesInProgress.meals)
      .find((mealId) => mealId[0] === id);
    if (storedMeal) {
      setIdProgress(storedMeal[0]);
      setCheckedIngredients(storedMeal[1]);
      setCountChecked(storedMeal[1].length);
    }
    // setIsRecomendation(true);
  }, []);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes) setIsFavorite(favRecipes.some((favId) => favId.id === id));
  }, [isFavorite]);

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

  function handleShare() {
    const url = window.location.href
      .split('/')
      .filter((baseUrl) => baseUrl !== 'in-progress')
      .join('/');
    clipboardCopy(url);
    setIsCopy(true);
  }

  function handleCheck({ target: { checked } }, index) {
    const checkCounter = checkListIngredients({ checked, index, id, countChecked },
      'meals');
    setCountChecked(checkCounter);
    if (checkCounter < listIngredients.current.length) {
      return setIsDisable(true);
    }
    setIsDisable(false);
  }

  // function handleDoneRecipes() {
  //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  //   const tags = strTags ? strTags.split(',') : [];
  //   const doneIndex = doneRecipes.some((doneId) => doneId.id === id);
  //   if (!doneIndex) {
  //     localStorage.setItem('doneRecipes', JSON.stringify(
  //       [...doneRecipes,
  //         {
  //           id: idMeal,
  //           type: 'comida',
  //           area: strArea,
  //           category: strCategory,
  //           alcoholicOrNot: '',
  //           name: strMeal,
  //           image: strMealThumb,
  //           doneDate: new Date().toLocaleDateString(),
  //           tags,
  //         },
  //       ],
  //     ));
  //   }
  //   // const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  //   // const inProgressIndex = recipesInProgress.meals.indexOf(recipesInProgress.meals
  //   //   .find((mealId) => mealId === id));

  //   // const newStorage = [...favRecipes.slice(0, favIndex),
  //   //   ...favRecipes.slice(favIndex + 1)];
  //   // localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  //   history.push('/receitas-feitas');
  // }

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
              alt="favorite icon"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="recipe-category">{strCategory}</p>
          {createListIngredients(recipes).map((ingredient, index) => (
            <div key={ ingredient }>
              <label htmlFor={ ingredient } data-testid={ `${index}-ingredient-step` }>
                <input
                  name={ ingredient }
                  type="checkbox"
                  defaultChecked={ checkedIngredients.includes(index) }
                  onClick={ (e) => handleCheck(e, index) }
                />
                {ingredient}
              </label>
            </div>
          ))}
          <p data-testid="instructions">{strInstructions}</p>
          <button
            style={ bottomFixed }
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isDisable }
            onClick={ () => {
              handleDoneRecipes({
                id: idMeal,
                type: 'comida',
                area: strArea,
                category: strCategory,
                name: strMeal,
                image: strMealThumb,
                strTags,
              });
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
