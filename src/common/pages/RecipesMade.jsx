import React from 'react';
import Header from '../components/Header/Header';
import CategoryButton from '../components/CategoryButton';
import comidas from './comidas';

export default function RecipesMade() {
  const handleClickCategory = () => console.log('handleClickCategory');
  const getRecipes = () => console.log('getRecipes');

  const renderRecipesMade = () => (
    comidas.map((recipe, index) => (
      <div key={ index }>
        <img
          src={ recipe.strMealThumb }
          alt={ recipe.strMealThumb }
          data-testid={ `${index}-horizontal-image` }
        />
      </div>
    ))
  );

  return (
    <>
      <Header pageName="Receitas Feitas" />
      <CategoryButton
        clickCategory={ handleClickCategory }
        clickAll={ getRecipes }
        path
      />
      { renderRecipesMade() }
    </>
  );
}
