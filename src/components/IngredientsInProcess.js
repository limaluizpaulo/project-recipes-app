import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/IngredientsInProcess.css';

function returnType(pathname) {
  const type = pathname.includes('comidas') ? 'meals' : 'cocktails';
  return type;
}

function IngredientsInProcess({ index, element, measures,
  ingredientsUsed, updateIngredientsUsed, idMeal }) {
  const [checked, setchecked] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  function toogleClass() {
    setchecked(!checked);
  }

  function updateUsedIngredients(ingredientName) {
    if (ingredientsUsed.includes(element[1])) {
      console.log(ingredientName, pathname, idMeal, ingredientsUsed);
      const newIngredientsUsed = ingredientsUsed.filter((ingredient) => ingredient
      !== ingredientName);
      console.log(newIngredientsUsed);
      const inLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inLocalStorage) {
        const type = returnType(pathname);
        inLocalStorage[type][idMeal] = newIngredientsUsed;
        console.log(newIngredientsUsed);
        localStorage.setItem('inProgressRecipes', JSON.stringify(inLocalStorage));
        updateIngredientsUsed();
      }
    } else {
      const newIngredientsUsed = [...ingredientsUsed, ingredientName];
      const inLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inLocalStorage) {
        const type = returnType(pathname);
        inLocalStorage[type][idMeal] = newIngredientsUsed;
        localStorage.setItem('inProgressRecipes', JSON.stringify(inLocalStorage));
        updateIngredientsUsed();
      }
    }
  }

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
        type="checkbox"
        className="ingredientProgress-input"
        onChange={ () => {
          toogleClass();
          updateUsedIngredients(element[1]);
        } }
        key={ index }
        checked={ ingredientsUsed.includes(element[1]) }
      />
      <span
        className={ ingredientsUsed.includes(element[1])
          ? 'checked-item' : 'not-checked-item' }
      >
        { `${element[1]}
                - ${measures[index][1] === null
      ? 'as you like' : measures[index][1]}` }
      </span>
    </div>
  );
}

IngredientsInProcess.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.array).isRequired,
  ingredientsUsed: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateIngredientsUsed: PropTypes.func.isRequired,
  idMeal: PropTypes.string.isRequired,
};

export default IngredientsInProcess;
