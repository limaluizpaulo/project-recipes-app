import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../context/RecipesContext';

function CategoryButton({ category }) {
  const { searchByCategory } = useContext(RecipesContext);

  return (
    <button
      type="button"
      data-testid={ `data-testid=${category}-category-filter` }
      onClick={ () => searchByCategory(category) }
    >
      { category }
    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryButton;
