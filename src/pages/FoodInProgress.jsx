import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import Context from '../context/Context';
import { copyLink, verifyCheck } from '../services/functions';
import shareIcon from '../images/shareIcon.svg';
import { verifyFavorite,
  settingFavorite,
  storageCheckGenerator,
  storageCheckUpdater,
  checkBoolean } from '../services/manageLocalStorage';

function FoodInProgress({ match, match: { params: { id } }, history }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [check, setCheck] = useState();
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  function loopIngredientsAndMeasure(mealArray, IngredientsAndMeasures) {
    return (
      mealArray.map((_a, index) => (
        <section
          className={ storageCheckGenerator(id, index) ? 'showCss' : 'hideCss' }
          data-testid={ `${index}-ingredient-step` }
          key={ `ingredientAndMeasure${index + 1}` }
        >
          <input
            checked={ checkBoolean(id, index) }
            className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }
            key={ index }
            type="checkbox"
            onClick={ () => {
              setRefresh(storageCheckUpdater(id, index, refresh));
            } }
          />
          <span className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }>
            {' '}
            {IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]}
          </span>
          <span
            className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }
          >
            {IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}
          </span>
        </section>
      ))
    );
  }

  if (details.meals && id === details.meals[0].idMeal) {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.meals[0]);
    const mealArray = Object.keys(IngredientsAndMeasures.ingredient);

    if (!check) {
      const cssObject = {};
      mealArray.forEach((_a, index) => { cssObject[index] = false; });
      setCheck(cssObject);
    }

    const {
      strMealThumb,
      strMeal,
      strInstructions,
      strCategory,
      strYoutube,
    } = details.meals[0];

    return (
      <main>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="Meal" width="200px" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          <button
            type="button"
            onClick={ () => setIsCopied(copyLink(match)) }
          >
            <img src={ shareIcon } alt="Share" />
            {isCopied ? <p>Link copiado!</p> : null }
          </button>
        </button>
        <button
          type="button"
          onClick={ () => setRefresh(settingFavorite(details, id, refresh)) }
        >
          <img
            alt="Favorite"
            src={ verifyFavorite(id) }
            data-testid="favorite-btn"
          />
        </button>
        <p data-testid="recipe-category">{strCategory}</p>
        <span data-testid="instructions">{strInstructions}</span>
        {loopIngredientsAndMeasure(mealArray, IngredientsAndMeasures)}
        <iframe
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          width="300px"
          title="Recipe"
        />
        <h3>Recomendações de Drinks</h3>
        <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default FoodInProgress;
