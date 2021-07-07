import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import progressRecipeStorage from '../hooks/progressAddStorage';
import '../styles/global.css';

function IngredientsInProcess({ index, element, measures }) {
  const [checked, setchecked] = useState(false);
  const [active, setActive] = useState(false);

  function renderProgress() {
    const inputs = document.querySelectorAll('input');
    const objectItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (objectItems === null) return null;
    if (objectItems) {
      if (document.URL.includes('bebidas')) {
        const drinks = objectItems.cocktails;
        const array = [...inputs];
        array.map((input, idx) => {
          const keys = Object.keys(drinks);
          if (keys[idx] === input.id) {
            input.checked = true;
            const span = input.parentNode.children;
            span[1].classList.add('marcado');
            return input.checked;
          }
          const span = input.parentNode.children;
          span[1].classList.remove('desmarcado');
          return input;
        });
      }
    }
  }

  useEffect(() => {
    renderProgress();
  }, []);

  function toogleClass({ target }) {
    const elements = target.id;
    const text = target.parentNode.children;
    const ingredient = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (target.checked === false) {
      let object = {};
      if (document.URL.includes('comidas')) {
        object = ingredient.meals;
        const indexForRemove = Object.keys(object).indexOf(elements);
        const newArray = Object.entries(object);
        newArray.splice(indexForRemove, 1);
        const newObject = newArray.map((array) => array[1]);
        const progress = { ...ingredient, meals: { ...newObject } };
        // console.log(progress);
        localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
      }
      if (document.URL.includes('bebidas')) {
        object = { ...ingredient.cocktails };
        const indexForRemove = Object.entries(object)
          .findIndex((elementItem) => elementItem[1][0] === text[1].innerText);
        // 3 posição [1][2][3]
        object[indexForRemove].splice(0, 1);
        const array = Object.entries(object);
        const newObject = array.map((item) => item[1])
          .filter((item) => (item.length !== 0));
        console.log(newObject);
        const progress = { ...ingredient, cocktails: { ...newObject } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
      }
    }
    setchecked(!checked);
    progressRecipeStorage(elements, text);
  }

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
        type="checkbox"
        className="inputs"
        onClick={ (ev) => toogleClass(ev) }
        key={ index }
        id={ index }
      />
      <span
        className={ checked && 'marcado' }
        id={ index }
      >
        {
          `${element[1]}
                - ${measures[index][1] === null
      ? 'as you like' : measures[index][1]}`
        }
      </span>
    </div>
  );
}

IngredientsInProcess.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default IngredientsInProcess;
