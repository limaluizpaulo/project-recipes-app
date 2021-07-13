import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import progressRecipeStorage from '../hooks/progressAddStorage';
import '../styles/global.css';
import { Context } from '../context/ContextForm';
import desrenderNull from '../helper/Condition';
import start, { request } from '../helper/addIdStorage';
import { requestByDetailsDrink, requestByDetailsMeal } from '../services/api';

function returnType(pathname) {
  const type = pathname.includes('comidas') ? 'meals' : 'cocktails';
  return type;
}

function IngredientsInProcess({ index, element, measures,
  ingredientsUsed, updateIngredientsUsed, idMeal }) {
  const [checked, setchecked] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  const divStyle1 = {
    textDecoration: 'line-through',
  };

  async function renderProgress() {
    const objectItems = await JSON.parse(localStorage.getItem('inProgressRecipes'));
    desrenderNull(objectItems);
    const inputs = document.querySelectorAll('input');
    const array = [...inputs];
    renderChecks(array, objectItems);
  }

  useEffect(() => {
    renderProgress();
  }, []);

  function conditional(ingredient, text) {
    let object = {};
    object = document.URL.includes('bebidas')
      ? ingredient.cocktails[param] : ingredient.meals[param];
    const indexForRemove = object.findIndex((item) => item === text[1].innerText);
    object.splice(indexForRemove, 1);
    const progress = document.URL.includes('bebidas')
      ? { ...ingredient, cocktails: { [param]: object } }
      : { ...ingredient, meals: { [param]: object } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }

  function toogleClass({ target }) {
    const text = target.parentNode.children;
    const ingredient = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (target.checked === false) {
      const span = target.parentNode.children;
      span[1].classList.remove('marcado');
      conditional(ingredient, text);
    }
    if (target.checked === true) {
      const span = target.parentNode.children;
      span[1].classList.add('marcado');
      progressRecipeStorage(text, param);
    }
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
        className="inputs"
        onChange={ () => {
          toogleClass();
          updateUsedIngredients(element[1]);
        } }
        key={ index }
        checked={ ingredientsUsed.includes(element[1]) }
      />
      <span style={ ingredientsUsed.includes(element[1]) ? divStyle1 : divStyle2 }>
        { `${element[1]}
                - ${measures[index][1] === null
      ? 'as you like' : measures[index][1]}`}
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
