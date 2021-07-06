import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetails({ match: { params: { id } } }) {
  const { details, detailsSyncSetState } = useContext(Context);

  useEffect(() => {
    if (!details.meals) {
      detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [details.meals, detailsSyncSetState, id]);

  function loopArray() {
    const mealArray = Object.entries(details.meals[0]);
    let count = 0;
    const EIGHT = 8;
    return (
      mealArray.map((forEachArray, index) => {
        console.log(`${forEachArray[0]}`, `strIngredient${index}`);
        if (forEachArray[0] === `strIngredient${index - EIGHT}`
          && forEachArray[1] !== ''
          && forEachArray[1] !== null) {
          count += 1;
          return (
            <div key={ count }>
              {details.meals[0][`strIngredient${count}`]}
              {' - '}
              {details.meals[0][`strMeasure${count}`]}
            </div>);
        }
        return null;
      }));
  }

  if (details.meals) {
    const { strMealThumb, strMeal, strInstructions, strCategory } = details.meals[0];
    return (
      <main>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="Meal" width="200px" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="Share" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="Share" />
        </button>
        <p data-testid="recipe-category">{strCategory}</p>
        <span data-testid="instructions">{strInstructions}</span>
        <button type="button" data-testid="start-recipe-btn">Começar</button>
        {loopArray()}
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  // details: PropTypes.shape().isRequired,
};

export default FoodDetails;

// Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
// O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
