import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../../context/RecipesContext';

function CategoryButton({ category }) {
  const { setRecipesCategory } = useContext(RecipesContext);

  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
      onClick={ () => setRecipesCategory((prevState) => {
        if (category === prevState) {
          return 'All';
        }
        return category;
      }) }
    >
      { category }
    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryButton;
