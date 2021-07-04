import React, { useContext } from 'react';

import Header from '../components/Header/Header';
import CategoryButton from '../components/CategoryButton';
import shareIcon from '../../images/shareIcon.svg';
import store from '../../context/store';

export default function RecipesMade() {
  const { recipes: { doneRecipes } } = useContext(store);
  const handleClickCategory = () => console.log('handleClickCategory');
  const getRecipes = () => console.log('getRecipes');

  const renderRecipesMade = () => (
    doneRecipes.map((recipe, index) => (
      <div key={ index }>
        { console.log(doneRecipes) }
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMealThumb || recipe.strDrinkThumb }
          data-testid={ `${index}-horizontal-image` }
          className="recipe"
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `Categoria: ${recipe.strCategory}` }
        </p>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { `Nome: ${recipe.strMeal || recipe.strDrink}` }
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { `Feita em: ${recipe.dateModified}` }
        </p>
        <a
          href={ recipe.strSource }
          target="_blank"
          rel="noopener noreferrer"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <input
            type="image"
            src={ shareIcon }
            alt="share"
          />
        </a>
        <p
          data-testid={ `${index}-${recipe.strTags}-horizontal-tag` }
        >
          { `Tags: ${recipe.strTags}` }
        </p>
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
