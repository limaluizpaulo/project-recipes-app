import React, { useState, useEffect } from 'react';
import FilterRecipe from '../../components/FilterRecipe';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeList from '../../components/RecipeList';
import { fetchCategoryFood, fetchRecipeAllFood } from '../../services/recipeAPI';

export default function MainFood() {
  const [list, setList] = useState({});
  const [categoryList, setCategoryList] = useState({});

  // ERRO DE REQUISITOS - FETCH FAIL
  useEffect(() => {
    const func = async () => {
      const fun = await fetchRecipeAllFood();
      setList(fun);
    };

    const category = async () => {
      const fun = await fetchCategoryFood();
      setCategoryList(fun);
    };

    category();
    func();
  }, []);

  return (
    <div
      className="main-food-class"
    >
      <Header title="Comidas" display="true" />
      <FilterRecipe list={ categoryList } recipeType="food" />
      <RecipeList listAll={ list } />
      <Footer />
    </div>
  );
}
