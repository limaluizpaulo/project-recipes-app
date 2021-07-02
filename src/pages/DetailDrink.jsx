import React, { useContext, useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import { RecipeDetailContext } from '../context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DetailDrink() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  const history = useHistory();
  const { id } = useParams();
  const { url } = useRouteMatch();
  const {
    recipeDetail,
    setIdDetail,
    setIsRecomendation,
  } = useContext(RecipeDetailContext);
  const [isFavorite, setIsFavorite] = useState();
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    setIdDetail(id);
    setIsRecomendation(true);
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage !== null && storage.find((findId) => findId.id === id)) {
      setIsFavorite(true);
    }
  }, []);

  function listIngredients(recipe) {
    const list = [];

    list.push(Object.entries(recipe)
      .filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      ))
      .filter((nullConditional) => (
        nullConditional[1] !== null
      ))
      .map((setIngredients) => (
        setIngredients[1].length > 0 && setIngredients[1]
      ))
      .filter((finalList) => finalList !== false));

    list.push(Object.entries(recipe)
      .filter((ingredient) => (
        ingredient[0].includes('strMeasure')
      ))
      .filter((nullConditional) => (
        nullConditional[1] !== null
      ))
      .map((setIngredients) => (
        setIngredients[1].length !== ' ' && setIngredients[1]
      ))
      .filter((finalList) => finalList !== false));

    return list;
  }

  function handleShare() {
    clipboardCopy(window.location.href);
    setIsCopy(true);
  }

  function ternary(measure) {
    return !measure ? '' : measure;
  }

  function handleFavorite({
    idDrink, strCategory, strAlcoholic, strDrinkThumb, strDrink }) {
    setIsFavorite(!isFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      },
    ]));
    if (isFavorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newStorage = storage.filter((findId) => findId.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setIsFavorite(false);
    }
  }

  return (
    <div>
      {recipeDetail.length > 0 && (
        <div>
          <h2 data-testid="recipe-title">{ recipeDetail[0].strDrink }</h2>
          <img
            src={ recipeDetail[0].strDrinkThumb }
            alt={ recipeDetail[0].strDrink }
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
            onClick={ () => handleFavorite(recipeDetail[0]) }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="profile icon"
            />
          </button>
          <p data-testid="recipe-category">{ recipeDetail[0].strAlcoholic }</p>
          <ul>
            {
              listIngredients(recipeDetail[0])[0].map((ing, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {` ${ing}: ${ternary(listIngredients(recipeDetail[0])[1][index])} `}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{recipeDetail[0].strInstructions}</p>
          <div data-testid="0-recomendation-card"> Falta criar</div>
          <button
            style={ bottomFixed }
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`${url}/in-progress`) }
          >
            Iniciar Receita
          </button>
        </div>
      )}
    </div>
  );
}
