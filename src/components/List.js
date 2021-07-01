import React from 'react';
import PropTypes from 'prop-types';

export default function List({ array, drinks }) {
  function filterIngredients(array) {
    const ingredients = Object.entries(array)
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    const measures = Object.entries(array)
      .filter((measure) => measure[0].includes('strMeasure'));
    return ingredients.map((element, index) => {
      if (element[1] !== null) {
        console.log('cheguei');
        if (element[1].length > 0) {
          return (
            <li
              className="list-ingredients"
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ` ${element[1]} - ${measures[index][1]}` }
            </li>
          );
        }
      }

      return '';
    });
  }

  return (
    <>
      <h2>Ingredients</h2>
      <ul>
        { array ? filterIngredients(array) : filterIngredients(drinks) }
      </ul>
    </>
  );
}

List.propTypes = {
  array: PropTypes.object,
  drinks: PropTypes.object,
}.isRequired;
