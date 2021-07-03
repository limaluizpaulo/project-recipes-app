import React from 'react';
import PropTypes from 'prop-types';
import { useMealsContext } from '../context/mealsContext';
import { fetchMealsByName } from '../services/mealsApi';

export default function DropdownArea({ data }) {
  const { setAreaSelected, setMealsFiltered } = useMealsContext();
  const TWELVE = 12;
  const handleClick = (event) => {
    if (event.target.value === 'All') {
      fetchMealsByName().then((res) => setMealsFiltered(res.slice(0, TWELVE)));
    } else {
      setAreaSelected(event.target.value);
    }
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
