import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';

function FilterIngredients({ filterIngredients, changeCheck, filterMeasures, checkArr }) {
  const { data } = useContext(FetchContext);

  return (
    <div>
      {
        filterIngredients.map((ingredient, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ ingredient }>
              <input
                type="checkbox"
                id={ ingredient }
                checked={ checkArr[index] }
                onClick={ () => changeCheck(index) }
              />
              { `${data[0][ingredient]} - ${data[0][filterMeasures[index]]}` }
            </label>
          </li>
        ))
      }
    </div>
  );
}

FilterIngredients.propTypes = {
  filterIngredients: PropTypes.arrayOf.isRequired,
  filterMeasures: PropTypes.arrayOf.isRequired,
  checkArr: PropTypes.arrayOf.isRequired,
  changeCheck: PropTypes.func.isRequired,
};

export default FilterIngredients;
