import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetails({ match: { params: { id } } }) {
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
  } = useContext(Context);

  let IngredientsAndMeasures = {};
  if (details.meals) {
    IngredientsAndMeasures = generateIngredientsAndMeasure(details.meals[0]);
  }

  useEffect(() => {
    if (!details.meals) {
      detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [details.meals, detailsSyncSetState, id]);

  function loopArray() {
    const mealArray = Object.keys(IngredientsAndMeasures.ingredient);
    return (
      mealArray.map((_a, index) => (
        <section key={ `ingredientAndMeasure${index + 1}` }>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            {IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]}
          </div>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            {IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}
          </div>
          <div data-testid={ `${index}-recomendation-card` } />
        </section>
      ))
    );
  }

  if (details.meals) {
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
        {loopArray()}
        <iframe
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          width="300px"
          title="Recipe"
        />
        <button type="button" data-testid="start-recipe-btn">
          Começar
        </button>
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

// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
