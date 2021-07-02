import React from 'react';
import PropTypes from 'prop-types';

function IngList({ ingredientsList }) {
  return (
    <section>
      Lista de ingredientes
      {
        ingredientsList.map((item, idx) => (
          <div key={ idx }>
            <div
              data-testid={ `${idx}-ingredient-name-and-measure` }
            >
              {item}
            </div>
          </div>))
      }
    </section>
  );
}

IngList.propTypes = {
  ingredientsList: PropTypes.arrayOf.isRequired,
};

export default IngList;
