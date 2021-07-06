import React from 'react';
import DoneRecipe from '../components/DoneRecipe';
import Header from '../components/Header';

function DoneRecipes() {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const recipesToMap = doneRecipes === null ? [] : JSON.parse(doneRecipes);
  console.log(recipesToMap);
  // const arrTeste = [1, 2, 3, 4, 5];
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {recipesToMap.map((recipe, index) => (
        <DoneRecipe
          key={ index }
          recipe={ recipe }
          index={ index }
        />))}
    </div>
  );
}

export default DoneRecipes;
