import React from 'react';
import PropTypes from 'prop-types';

function IngList({ ingredientsList, measures }) {
  return (
    <section>
      Lista de ingredientes
      {
        ingredientsList.map((item, idx) => {
          if (item === null || item === '') {
            return null;
          }
          if (item) {
            return (
              <div key={ idx }>
                <div
                  data-testid={ `${idx}-ingredient-name-and-measure` }
                >
                  {
                    `${item} ${measures[idx]}`
                  }
                </div>
              </div>
            );
          }
        })
      }
    </section>
  );
}

IngList.propTypes = {
  ingredientsList: PropTypes.arrayOf.isRequired,
  measures: PropTypes.arrayOf.isRequired,
};

export default IngList;
