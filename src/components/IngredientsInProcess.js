import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/global.css';

function IngredientsInProcess({ index, element, measures }) {
  const [checked, setchecked] = useState(false);
  const [count, setCount] = useState(0);

  const divStyle1 = {
    textDecoration: 'line-through',
  };

  const divStyle2 = {
    textDecoration: 'none',
  };

  function toogleClass() {
    setchecked(!checked);
  }

  console.log(index, element);

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
        type="checkbox"
        className="inputs"
        onChange={ () => toogleClass() }
        key={ index }
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
