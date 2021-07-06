import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/global.css';
import { Context } from '../context/ContextForm';

function IngredientsInProcess({ index, element, measures }) {
  const [checked, setchecked] = useState(false);
  const { paramId } = useContext(Context);

  const divStyle1 = {
    textDecoration: 'line-through',
  };

  const divStyle2 = {
    textDecoration: 'none',
  };

  function toogleClass({ target }) {
    setchecked(!checked);
    const elements = target.id;
    const objectItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (document.URL.includes('comidas')) {
      const progress = { ...objectItems, meals: { elements: [target] } };
    } else if (document.URL.includes('bebidas')) {
      const progress = { ...objectItems, cocktails: { elements: [] } };
    }
  }

  // console.log(index, element);

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
        type="checkbox"
        className="inputs"
        onChange={ (ev) => toogleClass(ev) }
        key={ index }
        id={ index }
      />
      <span
        style={ checked ? divStyle1 : divStyle2 }
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
};

export default IngredientsInProcess;
