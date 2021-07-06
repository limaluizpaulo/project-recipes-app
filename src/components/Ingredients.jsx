import React from 'react';
import PropTypes from 'prop-types';

const Ingredients = ({ newObj }) => {
  const { ingredients } = newObj;

  return (
    <section>
      <h3>Ingredients</h3>
      <ol>
        {ingredients && ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`- ${ingredient}`}
          </li>))}
      </ol>
    </section>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.string,
  obj: PropTypes.object,
}.isRequired;

export default Ingredients;
