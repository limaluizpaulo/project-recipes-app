import React, { useState } from 'react';

import Header from '../components/Header/Header';
import CategoryButton from '../components/CategoryButton';
import { getStorage } from '../../functions';
import DoneRecipeCard from '../components/DoneRecipeCard';

const DONE_RECIPES = 'doneRecipes';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(() => getStorage(DONE_RECIPES));

  const handleClickType = (type) => {
    const translate = (type === 'Food') ? 'comida' : 'bebida';
    const storageRecipes = getStorage(DONE_RECIPES);
    const foodsOrDrinks = storageRecipes.filter((recipe) => recipe.type === translate);
    setDoneRecipes(foodsOrDrinks);
  };
  const handleClickAll = () => setDoneRecipes(getStorage(DONE_RECIPES));

  return (
    <>
      <Header pageName="Receitas Feitas" />
      <CategoryButton
        foodOrDrink={ handleClickType }
        clickAll={ handleClickAll }
        path
      />
      { doneRecipes.map((recipe, i) => (
        <DoneRecipeCard
          recipe={ recipe }
          index={ i }
          key={ i }
        />
      )) }
    </>
  );
}
