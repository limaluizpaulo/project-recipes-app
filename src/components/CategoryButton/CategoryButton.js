import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from '../../context/RecipesContext';

function CategoryButton({ category }) {
  const { setRecipesCategory, setFiltredByIngredients } = useContext(RecipesContext);

  const handleClick = () => {
    setRecipesCategory((prevState) => {
      if (category === prevState) {
        return 'All';
      }
      return category;
    });
    setFiltredByIngredients(false);
  };

  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
      onClick={ handleClick }
    >
      { category }
    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryButton;
