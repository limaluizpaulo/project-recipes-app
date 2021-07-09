import React, { useState } from 'react';
import PropTypes from 'prop-types';

const IngredientsProgress = ({ newObj }) => {
  const { ingredients, measures } = newObj;
  const [done, setDone] = useState(false);

  return (
    <section>
      <h3>Ingredients</h3>
      <ol>
        {ingredients && ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <input
              type="checkbox"
              className={ done ? 'done' : '' }
              onClick={ () => {
                setDone(!done);
              } }
            />
            {`- ${ingredient} ${measures[index]}`}
          </li>
        ))}
      </ol>
    </section>
  );
};

IngredientsProgress.propTypes = {
  ingredients: PropTypes.string,
  obj: PropTypes.object,
}.isRequired;

export default IngredientsProgress;
