import React from 'react';
import PropTypes from 'prop-types';

function IngredientsStep(props) {
  const { value: {
    url,
    id,
    recipeIngredientsList,
    missingIngredients,
    checked,
    setChecked,
  } } = props;

  function handleClick(event) {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!event.target.nextSibling.classList.value) {
      event.target.nextSibling.classList.toggle('tachado');
      missingIngredients[event.target.value] = '';
      setChecked(checked + 1);
    } else {
      event.target.nextSibling.classList = '';
      missingIngredients[event.target.value] = `${event.target.value}`;
      setChecked(checked - 1);
    }
    if (url.match(/comidas/gi)) {
      inProgress.meals[id] = missingIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      inProgress.cocktails[id] = missingIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    console.log(checked);
  }

  function createCheckboxItems() {
    const checkboxes = recipeIngredientsList.map((entry, index) => {
      if (index === parseInt(missingIngredients[index], 10)) {
        return (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              onClick={ handleClick }
              type="checkbox"
              value={ index }
            />
            <label htmlFor={ index }>{ entry }</label>
            <br />
          </li>
        );
      }
      return (
        <li key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            checked
            onClick={ handleClick }
            type="checkbox"
            value={ index }
          />
          <label
            className="tachado"
            htmlFor={ index }
          >
            { entry }
          </label>
          <br />
        </li>
      );
    });
    return checkboxes.map((entry) => entry);
  }

  if (!props) return <h4>Carregando...</h4>;

  return (
    <div
      className="ingredients-step"
    >
      <h5>Ingredients</h5>
      { createCheckboxItems() }
    </div>
  );
}

IngredientsStep.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientsStep;
