import React from 'react';
import PropTypes from 'prop-types';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';

export default function BtnsCategory({ label, title }) {
  const { strCategory } = label;
  const { serValueMealsInput, valueMealsInput } = useMealsContext();
  const { serValueDrinksInput, valueDrinksInput } = useDrinksContext();

  const handleFilterByCategory = ({ target: { value } }) => {
    if (title === 'Comidas') {
      if (valueMealsInput !== value && value !== 'All') {
        serValueMealsInput(value);
      } else {
        serValueMealsInput('');
      }
    }
    if (title === 'Bebidas') {
      if (valueDrinksInput !== value && value !== 'All') {
        serValueDrinksInput(value);
      } else {
        serValueDrinksInput('');
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        value={ strCategory }
        data-testid={ `${strCategory}-category-filter` }
        onClick={ handleFilterByCategory }
      >
        {strCategory}
      </button>
    </div>
  );
}

BtnsCategory.propTypes = {
  label: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
};
