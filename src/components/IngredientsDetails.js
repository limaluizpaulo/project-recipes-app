import React from 'react';
import PropTypes from 'prop-types';

function IngredientsDetails({ index, element, measures }) {
  return (
    <div>
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { `${element[1]}
                - ${measures[index][1] === null
      ? 'as you like' : measures[index][1]}` }
      </li>
    </div>
  );
}

IngredientsDetails.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.arrayOf(PropTypes.object).isRequired,
  measures: PropTypes.string.isRequired,
};

export default IngredientsDetails;
