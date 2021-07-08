import React, { useState, useEffect } from 'react';
import FilterRecipe from '../../components/FilterRecipe';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeList from '../../components/RecipeList';
import { fetchCategoryDrinks, fetchRecipeAllDrink } from '../../services/recipeAPI';

// ERRO DE REQUISITOS - FETCH FAIL
function MainDrinks() {
  const [list, setList] = useState({});
  const [categoryList, setCategoryList] = useState({});

  useEffect(() => {
    const func = async () => {
      const fun = await fetchRecipeAllDrink();
      const category = await fetchCategoryDrinks();

      setCategoryList(category);
      setList(fun);
    };

    func();
  }, []);

  return (
    <div>
      <Header title="Bebidas" display="true" />
      { Object.keys(categoryList).length !== 0 && <FilterRecipe
        list={ categoryList }
        recipeType="drinks"
      />}
      {Object.keys(list).length !== 0
        && <RecipeList listAll={ list } />}
      <Footer />
    </div>
  );
}

export default MainDrinks;
