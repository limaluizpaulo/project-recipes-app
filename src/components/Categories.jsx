import React, { useContext, useEffect, useState } from 'react';
import Button from '../helpers/Button';
import RecipesContext from '../contexts/RecipesContext';
import {
  getMealsRecipes,
  getMealsByCategory,
  getMealsCategories,
} from '../helpers/MealsAPI';

export default function Categories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toggle, setToggle] = useState(false);
  const maxCards = 12;
  const maxCategories = 5;

  const {
    setData,
    type,
    ingredient,
    setIngredient,
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
      const results = await getMealsCategories(type);
      setCategoriesData(results.filter((item, index) => index < maxCategories));
    };
    getCategories();
  }, [type]);

  useEffect(() => {
    const filterCategory = async () => {
      try {
        if (ingredient !== '') return;
        let results;
        if (selectedCategory === 'All' && ingredient === '') {
          results = await getMealsRecipes(type);
        } else {
          results = await getMealsByCategory(selectedCategory, type);
        }
        if (results && selectedCategory) {
          setData(results.filter((item, index) => index < maxCards));
        }
      } catch (error) {
        console.log(error);
      }
    };
    filterCategory();
  }, [selectedCategory]);

  // useEffect(() => { console.log('select', selectedCategory); }, [selectedCategory]);

  return (
    <aside className="categories">
      <Button
        key="All"
        label="All"
        func={ () => {
          setIngredient('');
          strFilter('All');
        } }
        testid="All-category-filter"
        className={ `categories-btn ${type}` }
        disabled={ false }
      />
      {categoriesData.map(({ strCategory }) => (
        <Button
          key={ strCategory }
          label={ strCategory }
          func={ () => strFilter(strCategory) }
          testid={ `${strCategory}-category-filter` }
          className={ `categories-btn ${type}` }
          disabled={ false }
        />
      ))}
    </aside>
  );
}
