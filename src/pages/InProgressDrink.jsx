import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import RecipeContext from '../context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

export default function InProgressDrink() {
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
  const { idDrink, strCategory, strAlcoholic, strDrinkThumb,
    strDrink, strInstructions } = recipes[0] || [];
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [countCheked, setCountChecked] = useState(1);
  const BASE_URL_DETAIL_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  function createListIngredients() {
    let ingredientsList = [];
    const ingredients = Object.entries(recipes[0]).filter(([key, value]) => (
      value && value !== ' ' && (
        key.includes('strIngredient') || key.includes('strMeasure'))));

    for (let i = 0; i < ingredients.length / 2; i += 1) {
      ingredientsList = [...ingredientsList,
        `${ingredients[i][1]} - ${ingredients[i + (ingredients.length / 2)][1]}`];
    }
    return ingredientsList;
  }

  useEffect(() => {
    setRecipeUrl(BASE_URL_DETAIL_DRINK);
    if (recipes[0]) {
      listIngredients.current = createListIngredients(); // useRef usado só a título de curiosidade
    }
  }, [recipes]);

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const storedDrink = Object.entries(recipesInProgress.cocktails)
      .find((drinkId) => drinkId[0] === id);
    if (storedDrink) {
      setIdProgress(storedDrink[0]);
      setCheckedIngredients(storedDrink[1]);
      setCountChecked(storedDrink[1].length + 1);
    }
    // setIsRecomendation(true);
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage !== null && storage.find((findId) => findId.id === id)) {
      setIsFavorite(true);
    }
  }, []);

  function handleFavorite() {
    // setIsFavorite(!isFavorite);
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!isFavorite) {
      const favRecipe = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes, favRecipe]));
    } else {
      const favIndex = favRecipes.indexOf(favRecipes.find((favId) => favId.id === id));
      const newStorage = [...favRecipes.slice(0, favIndex),
        ...favRecipes.slice(favIndex + 1)];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
    setIsFavorite(!isFavorite);
  }

  function handleShare() {
    const url = window.location.href
      .split('/')
      .filter((baseUrl) => baseUrl !== 'in-progress')
      .join('/');
    clipboardCopy(url);
    setIsCopy(true);
  }

  function handleClick({ target: { checked } }, index) {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { cocktails: { [id]: [] }, meals: {} };
    if (checked) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(
          {
            ...recipesInProgress,
            cocktails: {
              ...recipesInProgress.cocktails,
              [id]: [...recipesInProgress.cocktails[id], index],
            },
          },
        ));
      setCountChecked(countCheked + 1);
    } else {
      let ingredientsList = recipesInProgress.cocktails[id];
      const ingredientIndex = ingredientsList.indexOf(index);
      ingredientsList = [...ingredientsList.slice(0, ingredientIndex),
        ...ingredientsList.slice(ingredientIndex + 1)];
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(
          {
            ...recipesInProgress,
            cocktails: {
              ...recipesInProgress.cocktails,
              [id]: ingredientsList,
            },
          },
        ));
      setCountChecked(countCheked - 1);
    }
    if (countCheked < listIngredients.current.length) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
    console.log(countCheked);
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
            onClick={ () => handleFavorite() }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="recipe-category">{strAlcoholic}</p>
          {createListIngredients().map((ingredient, index) => (
            <div key={ ingredient }>
              <label htmlFor={ ingredient } data-testid={ `${index}-ingredient-step` }>
                <input
                  name={ ingredient }
                  type="checkbox"
                  defaultChecked={ checkedIngredients.includes(index) }
                  onClick={ (e) => handleClick(e, index) }
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
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar Receita
          </button>
        </div>
      )}
    </div>
  );
}
