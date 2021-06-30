import React from 'react';
import PropTypes from 'prop-types';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';

export default function BtnsCategory({ label, title }) {
  const { strCategory } = label;
  const { serValueMealsInput } = useMealsContext();
  const { serValueDrinksInput } = useDrinksContext();

  const handleFilterByCategory = ({ target: { value } }) => {
    if (title === 'Comidas') {
      serValueMealsInput(value);
    }
    if (title === 'Bebidas') {
      serValueDrinksInput(value);
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
// console.log(strCategory);

BtnsCategory.propTypes = {
  label: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
};
