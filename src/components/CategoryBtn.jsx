import React from 'react';

export default function CategoryBtn(category) {
  return (
    <button data-testid={ `${category}-category-filter` } type="button" key={ category }>
      { category }
    </button>
  );
}
