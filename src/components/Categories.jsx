import React, { useContext, useEffect, useState } from 'react';
import Button from '../helpers/Button';
import RecipesContext from '../contexts/RecipesContext';
import {
  getMealsRecipes,
  getMealsByCategory,
  getMealsCategories,
} from '../helpers/MealsAPI';
import {
  getCocktailsRecipes,
  getCocktailsByCategory,
  getCocktailsCategories,
} from '../helpers/CocktailsAPI';

export default function Categories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toggle, setToggle] = useState(false);
  const maxCards = 12;
  const maxCategories = 5;

  const {
    setData,
    type,
  } = useContext(RecipesContext);

  const strFilter = (strCategory) => {
    if (!toggle) {
      setToggle(true);
      setSelectedCategory(strCategory);
    } else if (toggle && strCategory !== selectedCategory) {
      setSelectedCategory(strCategory);
    } else {
      setToggle(false);
      setSelectedCategory('All');
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const results = (type === 'meals')
        ? await getMealsCategories() : await getCocktailsCategories();
      setCategoriesData(results.filter((item, index) => index < maxCategories));
    };
    getCategories();
  }, []);

  useEffect(() => {
    const filterCategory = async () => {
      let results;
      if (selectedCategory === 'All') {
        results = (type === 'meals')
          ? await getMealsRecipes() : await getCocktailsRecipes();
      } else {
        results = (type === 'meals') ? await getMealsByCategory(selectedCategory)
          : await getCocktailsByCategory(selectedCategory);
      }
      if (results && selectedCategory) {
        setData(results.filter((item, index) => index < maxCards));
      }
    };
    filterCategory();
  }, [selectedCategory]);

  return (
    <aside>
      <Button
        key="All"
        label="All"
        func={ () => strFilter('All') }
        testid="All-category-filter"
        className=""
        disabled={ false }
      />
      {categoriesData.map(({ strCategory }) => (
        <Button
          key={ strCategory }
          label={ strCategory }
          func={ () => strFilter(strCategory) }
          testid={ `${strCategory}-category-filter` }
          className=""
          disabled={ false }
        />
      ))}
    </aside>
  );
}
