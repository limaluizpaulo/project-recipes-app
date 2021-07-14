import React, { useContext, useEffect, useState } from 'react';
import store, { addRecipes, setFetchOnDone, setDoneLoading } from '../../context/store';
import { CATEG_DRINKS, CATEG_MEALS,
  DRINKS, fetchAPI, FETCH_CATEG_D, FETCH_CATEG_M, MEALS } from '../../services';
import CategoryButton from '../components/CategoryButton';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

export default function Recipes() {
  const [categoryOn, setCategoryOn] = useState(undefined);
  const {
    recipes: { fetchOn, loading, done, foods, meals,
      drinks, categoriesMeals, categoriesDrinks },
    setRecipes } = useContext(store);

  const getRecipes = async () => {
    const LOADING_TIME = 2500;
    const DONE_TIME = 1500;
    const Meals = await fetchAPI(MEALS);
    const catMeals = await fetchAPI(CATEG_MEALS);
    const Drinks = await fetchAPI(DRINKS);
    const catDrinks = await fetchAPI(CATEG_DRINKS);
    setTimeout(() => {
      setRecipes(
        addRecipes(Meals.meals, Drinks.drinks, catMeals.meals, catDrinks.drinks),
      );
      setRecipes(setDoneLoading(undefined, true));
      setTimeout(() => {
        setRecipes(setDoneLoading(true));
      }, DONE_TIME);
    }, LOADING_TIME);
    setRecipes(setFetchOnDone(false, undefined));
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

  useEffect(() => { if (fetchOn) getRecipes(); });

  // ---------------------------------------------------------------------------------------------

  if (!done) { return (<Loading loading={ loading } />); }
  return (
    <main>
      <Header pageName={ (foods) ? 'Comidas' : 'Bebidas' } />
      <section className="mainContent">
        <CategoryButton
          clickCategory={ handleClickCategory }
          clickAll={ getRecipes }
        />
        <RecipeCard />
      </section>
      <Footer />
    </main>
  );
}
