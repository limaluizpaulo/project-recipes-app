import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ categories, onClick }) => {
  const categoriesShow = 5;
  return (
    <div>
      {categories.map((category, index) => (index < categoriesShow ? (
        <button
          id={ category }
          key={ category }
          type="button"
          onClick={ onClick }
          data-testid={ `${category}-category-filter` }
        >
          {category}
        </button>
      ) : null))}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Categories;
