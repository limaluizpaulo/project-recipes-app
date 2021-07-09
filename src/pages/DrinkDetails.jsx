import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import { localStorageVerifier,
  verifyFavorite, settingFavorite } from '../services/manageLocalStorage';
import { copyLink } from '../services/functions';

function DrinkDetails({ match, match: { params: { id } }, history }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
    recomendationsFoods,
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  function loopIngredientsAndMeasure() {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.drinks[0]);
    const drinksArray = Object.keys(IngredientsAndMeasures.ingredient);
    return (
      drinksArray.map((_a, index) => (
        <section key={ `ingredientAndMeasure${index + 1}` }>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            {IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]}
          </div>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            {IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}
          </div>
        </section>
      ))
    );
  }

  const loopRecomendationsFoods = () => {
    const recommendationsNumber = 6;
    const slicedRecommendations = recomendationsFoods.slice(0, recommendationsNumber);
    return (
      slicedRecommendations.map((meal, index) => (
        <div
          className={ index === 0 || index === 1 ? '' : 'carousel' }
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <h3 data-testid={ `${index}-recomendation-title` }>
            {meal.strMeal}
          </h3>
          <img src={ meal.strMealThumb } alt="recommendation meal" width="150px" />
        </div>
      ))
    );
  };

  if (details.drinks && recomendationsFoods && id === details.drinks[0].idDrink) {
    console.log(details.drinks);
    const {
      strDrinkThumb,
      strDrink,
      strInstructions,
      strAlcoholic,
    } = details.drinks[0];

    return (
      <main>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="Drink" width="200px" />
        <h1 data-testid="recipe-title">{strDrink}</h1>
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
        <div data-testid="recipe-category">
          {strAlcoholic}
        </div>

        <span data-testid="instructions">{strInstructions}</span>
        {loopIngredientsAndMeasure()}
        <h3>Recomendações de Comidas</h3>
        {loopRecomendationsFoods()}
        {localStorageVerifier(match, id, history)}
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default DrinkDetails;