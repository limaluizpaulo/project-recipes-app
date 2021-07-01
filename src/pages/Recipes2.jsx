import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';

import '../styles/Card.css';
import { fetchAllRecipes,
  fetchCatRecipes,
  fetchRecipesByCategory } from '../services/api';

function Recipes() {
  const {
    recipes,
    setRecipes,
    setCategories,
    categories,
    recipeCategory,
    setRecipeCategory,
  } = useContext(RecipesContext);

  useEffect(() => {
    const TWELVE_RECIPES = 12;
    async function fetchData() {
      if (recipeCategory === 'All') {
        const recipesFromApi = await fetchAllRecipes();
        setRecipes(recipesFromApi.meals.slice(0, TWELVE_RECIPES));
      } else {
        const recipesFromApi = await fetchRecipesByCategory(recipeCategory);
        setRecipes(recipesFromApi.meals.slice(0, TWELVE_RECIPES));
      }
    }
    fetchData();
  }, [recipeCategory, setRecipes]);

  useEffect(() => {
    async function fetchData() {
      const FIVE_CATEGORIES = 5;
      const categoriesFromApi = await fetchCatRecipes();
      setCategories(categoriesFromApi.meals.slice(0, FIVE_CATEGORIES));
    }
    fetchData();
  }, [setCategories]);

  return (

    <>
      <section className="category-field">
        <Button
          className="btn-category"
          data-testid="All-category-filter"
          onClick={ (ev) => { setRecipeCategory(ev.target.innerText); } }
        >
          All
        </Button>
        {categories.map((category, index) => (<CategoryCard
          key={ index }
          comida
          name={ category.strCategory }
        />))}
      </section>
      <section className="cards-field">
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (<FoodCard
          key={ idMeal }
          id={ idMeal }
          index={ index }
          food={ strMeal }
          thumb={ strMealThumb }
          comida
        />))}
      </section>
    </>
  );
}
