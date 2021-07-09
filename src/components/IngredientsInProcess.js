import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import progressRecipeStorage from '../hooks/progressAddStorage';
import '../styles/global.css';
import { Context } from '../context/ContextForm';
import checkProgress from '../helper/renderLocalStorage';
import onditionItems from '../helper/disabledButton';

function IngredientsInProcess({ index, element, measures }) {
  const { param, setParam, setActive } = useContext(Context);
  const params = useParams();
  const [state, setState] = useState(progressRecipeStorage(params.id) || {});

  function countInputs() {
    const object = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const array = [...document.querySelectorAll('input')];
    onditionItems(object, params, array, setActive);
  }

  useEffect(() => {
    setParam(params.id);
    countInputs();
  }, []);

  function conditional(input) {
    const span = input.parentNode.children;
    const indexForRemove = state.indexOf(span[1].innerText);
    const newState = state.splice(indexForRemove, 1);
    console.log(newState);
    setState(newState);
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (document.URL.includes('bebidas')) {
      inProgressRecipes.cocktails[params.id] = state;
    }
    if (document.URL.includes('comidas')) {
      inProgressRecipes.meals[params.id] = state;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  function toogleClass({ target }) {
    const text = target.parentNode.children;
    if (target.checked === false) {
      const span = target.parentNode.children;
      span[1].classList.remove('marcado');
      conditional(target);
    }
    if (target.checked === true) {
      const span = target.parentNode.children;
      span[1].classList.add('marcado');
      const objectState = progressRecipeStorage(param, text, target.id);
      setState(objectState);
      console.log(objectState);
    }
    countInputs();
  }

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
        type="checkbox"
        className="inputs"
        onChange={ (ev) => toogleClass(ev) }
        key={ index }
        id={ element[1] }
        checked={ checkProgress(element, params) }
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
