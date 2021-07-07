import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientsStep(props) {
  const { value: { recipe, url, id } } = props;
  const object = Object.entries(recipe);
  const recipeIngredients = object.filter((entry) => (
    entry[0].match(/strIngredient/) && entry[1] !== '' && entry[1] !== null));
  const recipeQuantities = object.filter((entry) => (
    entry[0].match(/strMeasure/) && entry[1] !== ' ' && entry[1] !== null));
  const recipeIngredientsList = [];
  for (let i = 0; i < recipeIngredients.length; i += 1) {
    recipeIngredientsList.push(
      ` ${recipeIngredients[i][1]} - ${recipeQuantities[i][1]}`,
    );
  }
  const [missingIngredients, setMissingIngredients] = useState();

  function loadDoneItems() {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) {
      if (url.match(/comidas/gi)) {
        return inProgress.meals[id];
      }
      return inProgress.cocktails[id];
    }
  }

  useEffect(() => {
    setMissingIngredients(loadDoneItems());
  }, []);

  function handleClick(event) {
    console.log(event.target.checked);
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!event.target.nextSibling.classList.value) {
      event.target.nextSibling.classList.toggle('tachado');
      const newMissingIngredients = missingIngredients;
      // newMissingIngredients[event.target.value] = '';
      // setMissingIngredients(newMissingIngredients);
      console.log(newMissingIngredients);
    } else {
      event.target.nextSibling.classList = '';
      const newMissingIngredients = missingIngredients;
      // newMissingIngredients[event.target.value] = `${event.target.value}`;
      // setMissingIngredients(newMissingIngredients);
      console.log(newMissingIngredients);
    }
    if (url.match(/comidas/gi)) {
      inProgress.meals[id] = missingIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      inProgress.cocktails[id] = missingIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
  }

  if (recipeIngredientsList && missingIngredients) {
    return (
      <div
        className="ingredients-step"
      >
        <h5>Ingredients</h5>
        <ul className="ingredients-list">
          {recipeIngredientsList.map((entry, index) => {
            if (index === parseInt(missingIngredients[index], 10)) {
              return (
                <li key={ index }>
                  <input
                    value={ index }
                    type="checkbox"
                    data-testid={ `${index}-ingredient-step` }
                    onClick={ handleClick }
                  />
                  <label htmlFor={ index }>{ entry }</label>
                </li>
              );
            }
            return (
              <li key={ index }>
                <input
                  type="checkbox"
                  data-testid={ `${index}-ingredient-step` }
                  onClick={ handleClick }
                  checked
                />
                <label
                  className="tachado"
                  htmlFor={ index }
                >
                  { entry }
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return <h4>Carregando</h4>;
}

IngredientsStep.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientsStep;
