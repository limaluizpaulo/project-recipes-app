import React from 'react';
import PropTypes from 'prop-types';

function IngList({ ingredientsList, measures }) {
  const filterList = ingredientsList.filter((item) => item !== null && item !== '');
  const filterMeasures = measures.filter((msrs) => msrs !== null && msrs !== '');

  return (
    <section>
      Lista de ingredientes
      {
        filterList.map((item, idx) => (
          <div key={ idx }>
            <div
              data-testid={ `${idx}-ingredient-name-and-measure` }
            >
              {
                `${item} ${filterMeasures[idx]}`
              }
            </div>
          </div>
        ))
      }
    </section>
  );
}

IngList.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
};

IngList.defaultProps = {
  ingredientsList: PropTypes.arrayOf(
    PropTypes.shape({
      oneOf: PropTypes.string,
    }),
  ),
  measures: PropTypes.arrayOf(
    PropTypes.shape({
      oneOf: PropTypes.string,
    }),
  ),
};

export default IngList;
