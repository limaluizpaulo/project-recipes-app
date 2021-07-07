import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import progressRecipeStorage from '../hooks/progressAddStorage';
import '../styles/global.css';
import { Context } from '../context/ContextForm';
import desrenderNull from '../helper/Condition';
import start, { request } from '../helper/addIdStorage';
import { requestByDetailsDrink, requestByDetailsMeal } from '../services/api';

function IngredientsInProcess({ index, element, measures }) {
  const { param, setParam } = useContext(Context);
  const params = useParams();

  function countInputs() {
    const array = [...document.querySelectorAll('input')];
    console.log(array);
  }

  useEffect(() => {
    setParam(params.id);
    request(requestByDetailsDrink, requestByDetailsMeal, start, params);
    countInputs();
  }, [params.id]);

  function renderChecks(array, objectItems) {
    const drinks = document.URL.includes('bebidas') ? objectItems.cocktails[params.id]
      : objectItems.meals[params.id];
    array.map((input, idx) => {
      const keys = Object.keys(drinks);
      if (keys[idx] === input.id) {
        input.checked = true;
        const span = input.parentNode.children;
        span[1].classList.add('marcado');
        return input.checked;
      }
      const span = input.parentNode.children;
      span[1].classList.remove('marcado');
      return input;
    });
  }

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
