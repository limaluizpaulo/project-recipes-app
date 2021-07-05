import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import { filterCategoryMeals, filterCategoryDrinks } from '../services/Api';

function Category({ }) {
  const { categories, setData, typeFunc } = useContext(FetchContext)

  const handleClick = ({target : { value } }) => {
    if (typeFunc === 'Foods') {
      return filterCategoryMeals(value).then((res) => setData(res))
    } else {
      return filterCategoryDrinks(value).then((res) => setData(res))
    }
  }

  return (
    <div>
      { console.log(typeFunc) }
      {
        categories.filter((el, index) => index <= 4)
          .map((category, index) => (
            <button 
              data-testid={`${category.strCategory}-category-filter`}
              value={category.strCategory}
              onClick={ handleClick }
            >{category.strCategory}</button>
          ))
      }
    </div>
  )
}

export default Category;