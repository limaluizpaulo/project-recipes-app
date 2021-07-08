import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import Context from '../context/Context';
import { copyLink } from '../services/functions';
import shareIcon from '../images/shareIcon.svg';
import { localStorageVerifier,
  verifyFavorite, settingFavorite } from '../services/manageLocalStorage';

function FoodInProgress({ match, match: { params: { id } }, history }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  function loopIngredientsAndMeasure() {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.meals[0]);
    const mealArray = Object.keys(IngredientsAndMeasures.ingredient);
    return (
      mealArray.map((_a, index) => (
        <section key={ `ingredientAndMeasure${index + 1}` }>
          <input type="checkbox" data-testid={ `${index}-ingredient-step` } />
          {IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]}
          <span>
            {IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}
          </span>
        </section>
      ))
    );
  }

  if (details.meals && id === details.meals[0].idMeal) {
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
        {loopIngredientsAndMeasure()}
        <iframe
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          width="300px"
          title="Recipe"
        />
        {localStorageVerifier(match, id, history)}
        <h3>Recomendações de Drinks</h3>
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
