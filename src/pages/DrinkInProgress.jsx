import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import loopIngredientsAndMeasure from '../components/loopIngredientsAndMeasure';
import Context from '../context/Context';
import { copyLinkInProgress } from '../services/functions';
import shareIcon from '../images/shareIcon.svg';
import { verifyFavorite,
  settingFavorite,
  disableFinishRecipeButton } from '../services/manageLocalStorage';

function DrinkInProgress({ match, match: { params: { id } } }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  const [check, setCheck] = useState();
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  if (details.drinks && id === details.drinks[0].idDrink) {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.drinks[0]);
    const drinkArray = Object.keys(IngredientsAndMeasures.ingredient);

    if (!check) {
      const cssObject = {};
      drinkArray.forEach((_a, index) => { cssObject[index] = false; });
      setCheck(cssObject);
    }

    const {
      strDrinkThumb,
      strDrink,
      strInstructions,
      strCategory,
    } = details.drinks[0];

    return isRedirect ? <Redirect to="/receitas-feitas" /> : (
      <main>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="Drink" width="200px" />
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          <button
            type="button"
            onClick={ () => setIsCopied(copyLinkInProgress(match)) }
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
        {loopIngredientsAndMeasure(drinkArray,
          IngredientsAndMeasures,
          id,
          [refresh, setRefresh])}
        <h3>Recomendações de Drinks</h3>
        <button
          onClick={ () => setIsRedirect(true) }
          disabled={ disableFinishRecipeButton(id) }
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default DrinkInProgress;
