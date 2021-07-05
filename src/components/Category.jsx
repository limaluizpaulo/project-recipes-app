import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import { filterCategoryMeals, filterCategoryDrinks } from '../services/Api';

function Category() {
  const { categories, setData, typeFunc } = useContext(FetchContext);

  const handleClick = ({ target: { value } }) => {
    if (typeFunc === 'Foods') {
      return filterCategoryMeals(value).then((res) => setData(res));
    }
    return filterCategoryDrinks(value).then((res) => setData(res));
  };

  const FOUR = 4;

  return (
    <div>
      {
        categories.filter((el, index) => index <= FOUR)
          .map((category, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              value={ category.strCategory }
              onClick={ handleClick }
            >
              {category.strCategory}

            </button>
          ))
      }
    </div>
  );
}

export default Category;
