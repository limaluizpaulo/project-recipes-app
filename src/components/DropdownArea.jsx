import React from 'react';
import PropTypes from 'prop-types';
import { useMealsContext } from '../context/mealsContext';

export default function DropdownArea({ data }) {
  const { setAreaSelected } = useMealsContext();
  const handleClick = (event) => {
    setAreaSelected(event.target.value);
  };
  return (
    <select data-testid="explore-by-area-dropdown" onClick={ handleClick }>
      {data.map(({ strArea }, index) => (
        <option
          key={ index }
          value={ strArea }
          data-testid={ [`${strArea}-option`] }

        >
          {strArea}
        </option>
      ))}
    </select>
  );
}

DropdownArea.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};
