import React from 'react';
import store from '../../context/store';

export default function CategoryButton() {
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderRecipes = () => {
    const newCategories = (foods) ? (
      categoriesMeals.slice(0, categoriesLimit)) : (
      categoriesDrinks.slice(0, categoriesLimit));

  return (
    newCategories.map((category, index) => (
      <button
        type="button"
        key={ index }
        data-testid={ `${category}-category-filter` }
      >
        {category}
      </button>
    ))
  );
  }
