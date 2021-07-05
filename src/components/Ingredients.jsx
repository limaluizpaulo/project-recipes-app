import React from 'react';
import PropTypes from 'prop-types';

const Ingredients = ({ obj }) => {
  const { ingredients } = obj;

  return (
    <section>
      <h3>Ingredients</h3>
      <ol>
        {ingredients.map((ingredient, index) => (
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

DetailsRecipes.propTypes = {
  ingredients: PropTypes.string,
  obj: PropTypes.object,
}.isRequired;

export default Ingredients;
