import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/IngredientsInProcess.css';

function IngredientsInProcess({ index, element, measures }) {
  const [checked, setchecked] = useState(false);

  function toogleClass() {
    setchecked(!checked);
  }

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
        type="checkbox"
        className="ingredientProgress-input"
        onChange={ toogleClass }
        key={ index }
      />
      <span className={ checked ? 'checked-item' : 'not-checked-item' }>
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
