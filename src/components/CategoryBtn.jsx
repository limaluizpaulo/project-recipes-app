import React, { useState } from 'react';

export default function CategoryBtn(category, func, filterToggler, URL) {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    if (!toggle) {
      func(category);
      setToggle(true);
    } else {
      filterToggler(URL);
      setToggle(false);
    }
  };
  return (
    <button
      data-testid={ `${category}-category-filter` }
      type="button"
      key={ category }
      onClick={ () => handleToggle() }
    >
      { category }
    </button>
  );
}
