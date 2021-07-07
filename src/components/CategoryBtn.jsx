import React from 'react';

export default function CategoryBtn(category, func, handleToggle, toggle) {
  const submitFilter = () => {
    if (toggle.categoryName !== category) {
      func(category);
      handleToggle(category, true);
    } else {
      func();
      handleToggle('', false);
    }
  };

  return (
    <button
      data-testid={ `${category}-category-filter` }
      type="button"
      key={ category }
      onClick={ () => submitFilter() }
    >
      { category }
    </button>
  );
}
