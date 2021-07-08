import React, { useContext, useEffect, useState } from 'react';
import store, { addRecipes, setLoading } from '../../context/store';
import { CATEG_DRINKS, CATEG_MEALS,
  DRINKS, fetchAPI, FETCH_CATEG_D, FETCH_CATEG_M, MEALS } from '../../services';
import CategoryButton from '../components/CategoryButton';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Recipes() {
  const [categoryOn, setCategoryOn] = useState(undefined);
  const { recipes: { loading, foods, meals, drinks, categoriesMeals, categoriesDrinks },
    setRecipes } = useContext(store);

  const getRecipes = async () => {
    const Meals = await fetchAPI(MEALS);
    const catMeals = await fetchAPI(CATEG_MEALS);
    const Drinks = await fetchAPI(DRINKS);
    const catDrinks = await fetchAPI(CATEG_DRINKS);
    setRecipes(
      addRecipes(Meals.meals, Drinks.drinks, catMeals.meals, catDrinks.drinks),
    );
    setRecipes(setLoading(false));
    setCategoryOn(undefined);
  };

  const fetchCategory = async (category) => {
    if (foods) {
      const recipesByCategory = await fetchAPI(`${FETCH_CATEG_M}${category.strCategory}`);
      setRecipes(addRecipes(recipesByCategory.meals, drinks,
        categoriesMeals, categoriesDrinks));
    } else {
      const recipesByCategory = await fetchAPI(`${FETCH_CATEG_D}${category.strCategory}`);
      setRecipes(addRecipes(meals, recipesByCategory.drinks,
        categoriesMeals, categoriesDrinks));
    }
  };

  const handleClickCategory = async (category) => {
    if (!categoryOn || categoryOn !== category) {
      fetchCategory(category);
      setCategoryOn(category);
    } else {
      getRecipes();
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => { if (loading) getRecipes(); });

  // ---------------------------------------------------------------------------------------------

  if (loading) return (<h5>Loading...</h5>);
  return (
    <main>
      <Header pageName={ (foods) ? 'Comidas' : 'Bebidas' } />
      <CategoryButton
        clickCategory={ handleClickCategory }
        clickAll={ getRecipes }
      />
      <div className="Cards">
        <RecipeCard />
      </div>
      <Footer />
    </main>
  );
}
