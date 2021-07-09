import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/RecipesContext';
import fetchCategory, { FOOD_CATEGORY, DRINK_CATEGORY } from '../services/Categorys';

function CategoryOptions() {
  const [categoryList, setCategoryList] = useState([]);
  const { type, foodOrDrink: { idType } } = useContext(Context);
  const endpoint = type === '/comidas' ? FOOD_CATEGORY : DRINK_CATEGORY;

  useEffect(() => {
    const getCategory = () => {
      fetchCategory(endpoint, idType).then((data) => setCategoryList(data));
    };

    getCategory();
  }, [endpoint, idType]);

  const cinco = 5;

  return (
    <div>
      {categoryList.slice(0, cinco).map((category, i) => (
        <button
          type="button"
          key={ i }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default CategoryOptions;
