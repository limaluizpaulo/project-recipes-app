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
      const category = await fetchCategoryFood();

      setList(fun);
      setCategoryList(category);
    };

    func();
  }, []);

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
