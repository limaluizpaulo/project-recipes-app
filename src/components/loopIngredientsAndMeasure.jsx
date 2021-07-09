import React from 'react';
import {
  storageCheckGenerator,
  storageCheckUpdater,
  checkBoolean,
} from '../services/manageLocalStorage';

export default function loopIngredientsAndMeasure(
  mealArray,
  IngredientsAndMeasures,
  id,
  [refresh, setRefresh],
) {
  return (
    mealArray.map((_a, index) => (
      <section
        className={ storageCheckGenerator(id, index) ? 'showCss' : 'hideCss' }
        data-testid={ `${index}-ingredient-step` }
        key={ `ingredientAndMeasure${index + 1}` }
      >
        <input
          checked={ checkBoolean(id, index) }
          className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }
          key={ index }
          type="checkbox"
          onClick={ () => {
            setRefresh(storageCheckUpdater(id, index, refresh));
          } }
        />
        <span className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }>
          {' '}
          {IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]}
        </span>
        <span
          className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }
        >
          {IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}
        </span>
      </section>
    ))
  );
}
