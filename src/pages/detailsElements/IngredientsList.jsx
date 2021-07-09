import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList(props) {
  const { ingr } = props;

  return (
    <li
      data-testid={ `${ingr[1]}-ingredient-name-and-measure` }
    >
      {ingr[0].strIngredient}
      {' - '}
      {ingr[0].strMeasure}
    </li>
  );
}

IngredientsList.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default IngredientsList;
