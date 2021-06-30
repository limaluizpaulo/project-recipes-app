import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';

import { fetchAllRecipes, fetchCatRecipes } from '../services/api';

function Recipes() {
  const { recipes, setRecipes, setCategories, categories } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchData() {
      const TWELVE_RECIPES = 12;
      const recipesFromApi = await fetchAllRecipes();
      setRecipes(recipesFromApi.meals.slice(0, TWELVE_RECIPES));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const FIVE_CATEGORIES = 5;
      const categoriesFromApi = await fetchCatRecipes();
      setCategories(categoriesFromApi.meals.slice(0, FIVE_CATEGORIES));
    }
    fetchData();
  }, []);

  return (
    <section>
      <Button>All</Button>
      {categories.map(({ strCategory }, index) => (<CategoryCard
        key={ index }
        name={ strCategory }
      />))}
      {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (<FoodCard
        key={ idMeal }
        index={ index }
        food={ strMeal }
        thumb={ strMealThumb }
      />))}
    </section>
  );
}

export default Recipes;
