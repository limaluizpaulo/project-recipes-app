import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import progressRecipeStorage from '../hooks/progressAddStorage';
import '../styles/global.css';
import { Context } from '../context/ContextForm';
import renderProgress from '../helper/renderLocalStorage';
import onditionItems from '../helper/disabledButton';

function IngredientsInProcess({ index, element, measures }) {
  const { param, setParam, setActive } = useContext(Context);
  const params = useParams();

  function countInputs() {
    const object = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const array = [...document.querySelectorAll('input')];
    onditionItems(object, params, array, setActive);
  }

  useEffect(() => {
    setParam(params.id);
    renderProgress(params);
    countInputs();
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
      progressRecipeStorage(param, text, target.id);
    }
    countInputs();
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
