import React from 'react';
import PropTypes from 'prop-types';

function DetailsButton(props) {
  const { value: {
    url,
    food,
    recipe,
    inProgress,
    setInProgress,
  } } = props;

  function saveInProgress() {
    const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(recipeInProgress);
    const object = Object.entries(recipe);
    const recipeIngredients = object.filter((entry) => (
      entry[0].match(/strIngredient/) && entry[1] !== '' && entry[1] !== null));
    if (url.match(food)) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          ...recipeInProgress,
          meals: {
            [recipe.idMeal]: [...recipeIngredients],
          },
        }));
      setInProgress(true);
    } else {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          ...recipeInProgress,
          cocktails: {
            [recipe.idDrink]: [...recipeIngredients],
          },
        }));
      setInProgress(true);
    }
  }

  if (!inProgress) {
    return (
      <button
        className="start"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ saveInProgress }
      >
        <a href={ `${url}/in-progress` }>Iniciar Receita</a>
      </button>
    );
  }
  return (
    <button
      className="start"
      data-testid="start-recipe-btn"
      type="button"
    >
      <a href={ `${url}/in-progress` }>Continuar Receita</a>
    </button>
  );
}

DetailsButton.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsButton;
