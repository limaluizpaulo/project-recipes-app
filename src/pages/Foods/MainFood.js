import React, { useState, useEffect } from 'react';
import FilterRecipe from '../../components/FilterRecipe';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeList from '../../components/RecipeList';
import { fetchCategoryFood, fetchRecipeAllFood,
  fetchRecipeIngredientsExploreFood } from '../../services/recipeAPI';

export default function MainFood(match) {
  const [list, setList] = useState({});
  const [categoryList, setCategoryList] = useState({});

  // ERRO DE REQUISITOS - FETCH FAIL
  useEffect(() => {
    let fun;
    const func = async () => {
      if (match.location.ingredient) {
        fun = await fetchRecipeIngredientsExploreFood(match.location.ingredient);
      } else {
        fun = await fetchRecipeAllFood();
      }
      const category = await fetchCategoryFood();

      setList(fun);
      setCategoryList(category || {});
    };

    func();
  }, [match.location.ingredient]);

  return (
    <div
      className="main-food-class"
    >
      <Header title="Comidas" display="true" />
      { Object.keys(categoryList).length !== 0 && <FilterRecipe
        list={ categoryList }
        recipeType="food"
      />}
      {Object.keys(list).length !== 0
        && <RecipeList listAll={ list } />}
      <Footer />
    </div>
  );
}
