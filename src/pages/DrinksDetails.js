import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';
import Details from '../components/Details/Details';
import useRecipeByID from '../hooks/useRecipeByID';
import useRecommendation from '../hooks/useRecommendation';
import RecipesContext from '../context/RecipesContext';
import ConditionButton from '../components/ConditionButton/ConditionButton';

import './style/Details.css';

function DrinksDetails({ match: { params: { id } } }) {
  // CONSTANTS
  const MAX_RECOMMENDATIONS = 6;

  // CONTEXT
  const { startedRecipes } = useContext(RecipesContext);

  // STATES
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);

  // ROUTER HOOKS
  const { push } = useHistory();
  const { pathname } = useLocation();

  // CUSTOM HOOKS
  const recipe = useRecipeByID('drinks', 'strDrinks');
  const recommendations = useRecommendation('meals', MAX_RECOMMENDATIONS, 'strMeals');

  // EFFECTS - DIDMOUNT AND DIDUPDATE
  useEffect(() => {
    const arrayOfRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const objInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (arrayOfRecipes) {
      const found = arrayOfRecipes.find((element) => (
        element.id === id
      ));
      if (found) setAlreadyStarted(true);
    }

    if (objInProgress.cocktails[id]) {
      setIsInProgressRecipe(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedRecipes]);

  return (
    <>
      <Details
        id={ id }
        recipe={ recipe }
        recommendations={ recommendations }
      />
      <ConditionButton
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ () => {
          if (!isInProgressRecipe) {
            localstorageSaveStartedRecipe(recipe, ingredients);
          }

          push(`${pathname}/in-progress`);
        } }
        hidden={ alreadyStarted && !isInProgressRecipe }
      >
        { isInProgressRecipe ? 'Continuar Receita' : 'Iniciar Receita' }
      </ConditionButton>
    </>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default DrinksDetails;
