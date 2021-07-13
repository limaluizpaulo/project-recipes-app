import React, { useState, useEffect } from 'react';
import DoneRecipe from '../components/DoneRecipe';
import Header from '../components/Header';
import HomeAndReturn from '../components/HomeAndReturn';
import '../styles/DoneRecipes(page).css';

function DoneRecipes() {
  const doneRecipes = localStorage.getItem('doneRecipes');

  const [filterBy, setfilterBy] = useState('nenhum');
  const recipesToMap = (doneRecipes === null ? [] : JSON.parse(doneRecipes))
    .filter((recipe) => {
      if (filterBy === 'nenhum') return true;
      return recipe.type === filterBy;
    });
  useEffect(() => {}, [filterBy]);

  return (
    <div>
      <Header title="Receitas Feitas" />
      <div>
        <button
          type="button"
          className="done-category-btn"
          data-testid="filter-by-all-btn"
          onClick={ () => setfilterBy('nenhum') }
        >
          All
        </button>
        <button
          type="button"
          className="done-category-btn"
          data-testid="filter-by-food-btn"
          onClick={ () => setfilterBy('comida') }
        >
          Food
        </button>
        <button
          type="button"
          className="done-category-btn"
          data-testid="filter-by-drink-btn"
          onClick={ () => setfilterBy('bebida') }
        >
          Drinks
        </button>
      </div>
      {recipesToMap.length === 0
      && <h4 className="no-done-text">Não há receitas feitas</h4>}
      {recipesToMap.map((recipe, index) => (
        <DoneRecipe
          key={ index }
          recipe={ recipe }
          index={ index }
        />))}
      <HomeAndReturn />
    </div>
  );
}

export default DoneRecipes;
