import React from 'react';

export default function CategoryBtn(category, func) {
  return (
    <button
      data-testid={ `${category}-category-filter` }
      type="button"
      key={ category }
      onClick={ () => func(category) }
    >
      { category }
    </button>
  );
}
