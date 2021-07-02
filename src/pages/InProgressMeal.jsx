import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RecipeDetailContext } from '../context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function InProgressMeal() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  const history = useHistory();
  const { id } = useParams();
  const { setIdProgress, recipeInProgress } = useContext(RecipeDetailContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [countCheked, setCountChecked] = useState(1);

  let ingredientsStorage = [];

  if (
    JSON.parse(localStorage.getItem('inProgressRecipes'))
      && JSON.parse(localStorage.getItem('inProgressRecipes')).meals) {
    const storageProgress = (
      JSON.parse(localStorage.getItem('inProgressRecipes')).meals);
    [ingredientsStorage] = Object.values(storageProgress);
  }

  useEffect(() => {
    setIdProgress(id);
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage !== null && storage.find((findId) => findId.id === id)) {
      setIsFavorite(true);
    }
  }, []);

  function handleFavorite({ idMeal, strArea, strCategory, strMeal, strMealThumb }) {
    if (!isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ]));
      setIsFavorite(true);
    }
    if (isFavorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newStorage = storage.filter((findId) => findId.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setIsFavorite(false);
    }
  }

  function handleShare() {
    const url = window.location.href
      .split('/')
      .filter((baseUrl) => baseUrl !== 'in-progress')
      .join('/');
    clipboardCopy(url);
    setIsCopy(true);
  }

  function handleClick() {
    setCountChecked(countCheked + 1);
    if (countCheked === ingredientsStorage.length) {
      setIsDisable(false);
    }
  }

  return (
    <div>
      {recipeInProgress.length > 0 && (
        <div>
          <h2 data-testid="recipe-title">{ recipeInProgress[0].strMeal }</h2>
          <img
            src={ recipeInProgress[0].strMealThumb }
            alt={ recipeInProgress[0].strMeal }
            data-testid="recipe-photo"
          />
          <button
            type="button"
            data-testid="share-btn"
            src={ shareIcon }
            onClick={ () => handleShare() }
          >
            <img src={ shareIcon } alt="profile icon" />
          </button>
          {isCopy && (<p>Link copiado!</p>)}
          <button
            type="button"
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            onClick={ () => handleFavorite(recipeInProgress[0]) }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="profile icon"
            />
          </button>
          <p data-testid="recipe-category">{recipeInProgress[0].strCategory}</p>
          {ingredientsStorage.map((ing, i) => (
            <div key={ i }>
              <label htmlFor={ i } data-testid={ `${i}-ingredient-step` }>
                <input
                  name={ i }
                  type="checkbox"
                  onClick={ () => handleClick() }
                />
                {ing}
              </label>
            </div>
          ))}
          <p data-testid="instructions">{recipeInProgress[0].strInstructions}</p>
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
