import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IngredientsInProcess from './IngredientsInProcess';
import IngredientsDetails from './IngredientsDetails';
import '../styles/List.css';

export default function List({ array, drinks }) {
  const history = useHistory();
  const { pathname } = history.location;

  function filterIngredients(arrayList) {
    const ingredients = Object.entries(arrayList)
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    const measures = Object.entries(arrayList)
      .filter((measure) => measure[0].includes('strMeasure'));
    return ingredients.map((element, index) => {
      if (element[1] !== null) {
        console.log();
        if (element[1].length > 0) {
          return (
            <div key={ index }>
              { pathname.includes('in-progress')
                ? (
                  <IngredientsInProcess
                    index={ index }
                    element={ element }
                    measures={ measures }
                  />)
                : (
                  <IngredientsDetails
                    index={ index }
                    element={ element }
                    measures={ measures }
                  />)}
            </div>
          );
        }
      }
      return '';
    });
  }

  return (
    <>
      <h2>Ingredients</h2>
      <ul className="list-ingredients">
        { array ? filterIngredients(array) : filterIngredients(drinks) }
      </ul>
    </>
  );
}

List.propTypes = {
  array: PropTypes.object,
  drinks: PropTypes.object,
}.isRequired;
