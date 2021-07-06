import React, { useState } from 'react';

import Header from '../components/Header/Header';
import CategoryButton from '../components/CategoryButton';
import { getStorage } from '../../functions';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function RecipesMade() {
  const [doneRecipes] = useState(() => getStorage('doneRecipes'));

  const handleClickCategory = () => console.log('handleClickCategory');
  const getRecipes = () => console.log('getRecipes');

  return (
    <>
      <Header pageName="Receitas Feitas" />
      <CategoryButton
        clickCategory={ handleClickCategory }
        clickAll={ getRecipes }
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
