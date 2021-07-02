import React from 'react';
import Header from '../components/Header/Header';
import CategoryButton from '../components/CategoryButton';

export default function RecipesMade() {
  const handleClickCategory = () => console.log('handleClickCategory');
  const getRecipes = () => console.log('getRecipes');

  // const renderRecipesMade = () => (
  //   array.map((recipe, index) => (
  //     <div key={ index }>
  //       <img
  //         src={ recipe.src }
  //         alt="x"
  //         data-testid={ `${index}-horizontal-image` }
  //       />
  //     </div>
  //   ))
  // );

  return (
    <>
      <Header pageName="Receitas Feitas" />
      <CategoryButton
        clickCategory={ handleClickCategory }
        clickAll={ getRecipes }
        path
      />
      {/* { renderRecipesMade() } */}
    </>
  );
}
